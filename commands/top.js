import { getTop } from "../systems/ranking.js";
import { EmbedBuilder } from "discord.js";

export default {
    name: "top",
    async execute(message) {

        const top = getTop();

        if (!top.length) {
            return message.reply("❌ Немає даних");
        }

        let desc = "";

        for (let i = 0; i < top.length; i++) {
            const [userId, data] = top[i];

            desc += `**${i + 1}.** <@${userId}>
💬 ${data.messages} | 🎤 ${Math.floor(data.voice / 60)} хв\n\n`;
        }

        const embed = new EmbedBuilder()
            .setColor("#ffd700")
            .setTitle("🏆 Топ учасників")
            .setDescription(desc)
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }
};