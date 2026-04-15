import {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} from "discord.js";

export function getApplyModal() {
    const modal = new ModalBuilder()
        .setCustomId("applyModal")
        .setTitle("Заявка в сім'ю");

    const name = new TextInputBuilder()
        .setCustomId("name")
        .setLabel("Нік")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const age = new TextInputBuilder()
        .setCustomId("age")
        .setLabel("Вік")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const exp = new TextInputBuilder()
        .setCustomId("exp")
        .setLabel("Досвід")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

    const online = new TextInputBuilder()
        .setCustomId("online")
        .setLabel("Онлайн (год/день)")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    modal.addComponents(
        new ActionRowBuilder().addComponents(name),
        new ActionRowBuilder().addComponents(age),
        new ActionRowBuilder().addComponents(exp),
        new ActionRowBuilder().addComponents(online)
    );

    return modal;
}