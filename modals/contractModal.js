import {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} from "discord.js";

export function getContractModal() {
    const modal = new ModalBuilder()
        .setCustomId("contractModal")
        .setTitle("📋 Звіт по контракту");

    const name = new TextInputBuilder()
        .setCustomId("contractName")
        .setLabel("Назва контракту")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const players = new TextInputBuilder()
        .setCustomId("players")
        .setLabel("Учасники (STATIC ID через пробіл)")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

    const result = new TextInputBuilder()
        .setCustomId("result")
        .setLabel("Результат")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

    const proof = new TextInputBuilder()
        .setCustomId("proof")
        .setLabel("Докази")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

    modal.addComponents(
        new ActionRowBuilder().addComponents(name),
        new ActionRowBuilder().addComponents(players),
        new ActionRowBuilder().addComponents(result),
        new ActionRowBuilder().addComponents(proof)
    );

    return modal;
}