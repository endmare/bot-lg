import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export function getContractButton() {
    return new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId("contract")
            .setLabel("📋 Виконати контракт")
            .setStyle(ButtonStyle.Success)
    );
}