import {
    Client,
    GatewayIntentBits,
    Collection,
    EmbedBuilder
} from "discord.js";
import fs from "fs";
import config from "./config.js";

// systems
import { handleAutoPing } from "./systems/autoping.js";
import { handleApplications } from "./systems/applications.js";
import { handleContracts } from "./systems/contracts.js";
import { addMessage, handleVoice } from "./systems/ranking.js";
import { sendLog } from "./utils/logger.js";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.commands = new Collection();
client.config = config;

// =====================
// 📦 Завантаження команд
// =====================
const commandFiles = fs.readdirSync("./commands");

for (const file of commandFiles) {
    const command = await import(`./commands/${file}`);
    client.commands.set(command.default.name, command.default);
}

// =====================
// 💬 Повідомлення
// =====================
client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    // 📊 рейтинг
    addMessage(message.author.id);

    // 📢 автопінг
    handleAutoPing(message, client);

    // ❗ не команда
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).split(" ");
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        await command.execute(message, args, client);
    } catch (err) {
        console.error(err);
        message.reply("❌ Помилка виконання команди");
    }
});

// =====================
// 🎤 Голос
// =====================
client.on("voiceStateUpdate", (oldState, newState) => {
    handleVoice(oldState, newState);
});

// =====================
// 🔘 Кнопки / Модалки
// =====================
client.on("interactionCreate", async (interaction) => {
    try {
        await handleApplications(interaction, client);
        await handleContracts(interaction, client);
    } catch (err) {
        console.error("Interaction error:", err);
    }
});

// =====================
// 👋 Вхід
// =====================
client.on("guildMemberAdd", async (member) => {

    const embed = new EmbedBuilder()
        .setColor("#d4af37") // золото Legion
        .setTitle("⚔️ ЛАСКАВО ПРОСИМО ДО LEGION")
        .setDescription(
            `> **Новий член сім'ї прибув на базу...**\n\n` +
            `👤 **Гравець:** ${member}\n` +
            `🏷️ **Статус:** Гість\n` +
            `📍 **Організація:** LEGION FAMILY\n\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `🔥 **Тут ти не просто учасник — ти частина структури**\n` +
            `⚔️ Дисципліна, повага, активність\n` +
            `💀 Порушення правил = наслідки\n` +
            `━━━━━━━━━━━━━━━━━━\n\n` +
            `📌 Пройди адаптацію та доведи свою цінність`
        )
        .addFields(
            {
                name: "📋 Що далі?",
                value:
                    "• Подай заявку (якщо ще не прийнятий повністю)\n" +
                    "• Ознайомся з правилами\n" +
                    "• Долучайся до активностей",
                inline: false
            },
            {
                name: "🧠 Пам'ятай",
                value:
                    "> Legion — це не просто назва. Це дисципліна, структура і повага.",
                inline: false
            }
        )
        .setThumbnail(member.user.displayAvatarURL())
        .setImage("https://i.ibb.co/ddWVWZP/3987-C67-A-9-CE9-4-D06-A02-B-FF901-B2-D6-CF1.png") // 🔥 сюди можна банер
        .setFooter({ text: "LEGION SYSTEM • WELCOME PROTOCOL" })
        .setTimestamp();

    const channel = member.guild.channels.cache.get(config.welcomeChannelId);
    if (channel) {
        channel.send({ embeds: [embed] });
    }
});

// =====================
// 🚪 Вихід
// =====================
client.on("guildMemberRemove", async (member) => {
    const channel = member.guild.channels.cache.get(config.welcomeChannelId);
    if (!channel) return;

    const embed = new EmbedBuilder()
        .setColor("#ff4444")
        .setTitle("🚪 Учасник покинув сервер")
        .setDescription(member.user.tag)
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter({ text: "Legion System" })
        .setTimestamp();

    channel.send({ embeds: [embed] });

    await sendLog(client, `🚪 Вийшов: ${member.user.tag}`);
});

// =====================
// ❌ Видалені повідомлення
// =====================
client.on("messageDelete", async (message) => {
    if (!message.guild || message.author?.bot) return;

    await sendLog(client,
        `❌ Видалено повідомлення
👤 ${message.author?.tag}
📍 #${message.channel?.name}
💬 ${message.content || "нема"}`
    );
});

// =====================
// ✏️ Редагування повідомлень
// =====================
client.on("messageUpdate", async (oldMsg, newMsg) => {
    if (!oldMsg.guild || oldMsg.author?.bot) return;
    if (oldMsg.content === newMsg.content) return;

    await sendLog(client,
        `✏️ Редагування
👤 ${oldMsg.author.tag}
📍 #${oldMsg.channel.name}

Старе:
${oldMsg.content}

Нове:
${newMsg.content}`
    );
});

// =====================
// 🚀 Запуск
// =====================
client.once("ready", () => {
    console.log(`✅ Бот запущений як ${client.user.tag}`);
});

client.login(config.token);