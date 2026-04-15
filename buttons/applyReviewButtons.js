import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export function getApplyReviewButtons(appId, userId) {

    return new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(`app_accept_${appId}_${userId}`)
            .setLabel("✅ Прийняти")
            .setStyle(ButtonStyle.Success),

        new ButtonBuilder()
            .setCustomId(`app_reject_${appId}_${userId}`)
            .setLabel("❌ Відхилити")
            .setStyle(ButtonStyle.Danger)
    );
}