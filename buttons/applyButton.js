import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export function getApplyButton() {
    return new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId("apply")
            .setLabel("📩 Подати заявку")
            .setStyle(ButtonStyle.Primary)
    );
}