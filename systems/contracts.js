import { EmbedBuilder } from "discord.js";
import { sendLog } from "../utils/logger.js";

export async function handleContracts(interaction, client) {

    if (interaction.isButton()) {
        if (interaction.customId === "contract") {
            const { getContractModal } = await import("../modals/contractModal.js");
            return interaction.showModal(getContractModal());
        }
    }

    if (interaction.isModalSubmit()) {

        if (interaction.customId !== "contractModal") return;

        const name = interaction.fields.getTextInputValue("contractName");
        const playersRaw = interaction.fields.getTextInputValue("players");
        const result = interaction.fields.getTextInputValue("result");
        const proof = interaction.fields.getTextInputValue("proof");

        // 💥 розбиваємо STATIC ID
        const playersArray = playersRaw
            .split(" ")
            .filter(x => x.trim().length > 0);

        // 💥 красиво формуємо список
        const playersList = playersArray
            .map(p => `👤 ${p}`)
            .join("\n");

        const channel = await interaction.client.channels.fetch(
            interaction.client.config.contractsChannelId
        );

        const embed = new EmbedBuilder()
            .setColor("#ffaa00")
            .setTitle("📋 ЗВІТ ПО КОНТРАКТУ")
            .addFields(
                { name: "📌 Назва", value: name },
                { name: "👥 Учасники", value: playersList || "—" },
                { name: "📊 Результат", value: result },
                { name: "📎 Докази", value: proof }
            )
            .setFooter({ text: `Виконав: ${interaction.user.tag}` })
            .setTimestamp();

        await channel.send({ embeds: [embed] });

        await interaction.reply({
            content: "✅ Контракт зафіксовано",
            ephemeral: true
        });

        await sendLog(
            interaction.client,
            `📋 Контракт ${name} | ${interaction.user.tag}`
        );
    }
}