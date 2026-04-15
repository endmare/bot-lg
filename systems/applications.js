import { getApplyModal } from "../modals/applyModal.js";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { sendLog } from "../utils/logger.js";

export async function handleApplications(interaction, client) {

    // =========================
    // 🔘 OPEN MODAL
    // =========================
    if (interaction.isButton()) {
        if (interaction.customId === "apply") {
            return interaction.showModal(getApplyModal());
        }
    }

    // =========================
    // 📝 SUBMIT MODAL
    // =========================
    if (interaction.isModalSubmit()) {

        if (interaction.customId !== "applyModal") return;

        const name = interaction.fields.getTextInputValue("name");
        const age = interaction.fields.getTextInputValue("age");
        const exp = interaction.fields.getTextInputValue("exp");
        const online = interaction.fields.getTextInputValue("online");

        const appId = `APP-${Date.now()}`;

        const channel = await client.channels.fetch(
            client.config.applicationsChannelId
        );

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`accept_${appId}_${interaction.user.id}`)
                .setLabel("✅ Прийняти")
                .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
                .setCustomId(`reject_${appId}_${interaction.user.id}`)
                .setLabel("❌ Відхилити")
                .setStyle(ButtonStyle.Danger)
        );

        await channel.send({
            content:
`📩 **НОВА ЗАЯВКА**

👤 ${interaction.user}
🎮 Нік: ${name}
🎂 Вік: ${age}
📈 Досвід: ${exp}
⏱ Онлайн: ${online}

🆔 ID: ${appId}`,
            components: [row]
        });

        await interaction.reply({
            content: "✅ Заявку відправлено!",
            ephemeral: true
        });

        await sendLog(client, `📩 Заявка від ${interaction.user.tag}`);
    }

    // =========================
    // 🔘 BUTTONS
    // =========================
    if (interaction.isButton()) {

        const parts = interaction.customId.split("_");

        if (parts.length < 3) return;

        const action = parts[0];
        const appId = parts[1];
        const userId = parts[2];

        const user = await client.users.fetch(userId).catch(() => null);

        if (!user) {
            return interaction.reply({
                content: "❌ Користувача не знайдено",
                ephemeral: true
            });
        }

        // 🟢 ACCEPT
        if (action === "accept") {

            await user.send(
`🟢 ЗАЯВКУ ПРИЙНЯТО\n🆔 ${appId}`
            ).catch(() => {});

            return interaction.reply({
                content: "✅ Прийнято",
                ephemeral: true
            });
        }

        // 🔴 REJECT
        if (action === "reject") {

            await user.send(
`🔴 ЗАЯВКУ ВІДХИЛЕНО\n🆔 ${appId}`
            ).catch(() => {});

            return interaction.reply({
                content: "❌ Відхилено",
                ephemeral: true
            });
        }
    }
}