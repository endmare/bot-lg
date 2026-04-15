import { EmbedBuilder } from "discord.js";
import { getContractButton } from "../buttons/contractButton.js";

export default {
    name: "contractpanel",
    async execute(message) {

        const embed = new EmbedBuilder()
            .setColor("#ffaa00")
            .setTitle("📋 СИСТЕМА КОНТРАКТІВ")
            .setDescription(
                "Офіційна система фіксації виконаних операцій та завдань.\n" +
                "Використовується для звітності та контролю активності."
            )
            .addFields(
                {
                    name: "📌 Як це працює",
                    value:
                        "1. Натискаєш кнопку\n" +
                        "2. Заповнюєш форму\n" +
                        "3. Вказуєш учасників (STATIC ID)\n" +
                        "4. Відправляєш звіт",
                    inline: false
                },
                {
                    name: "👥 Учасники",
                    value:
                        "Вписуються в одному рядку через пробіл:\n" +
                        "`STATIC1 STATIC2 STATIC3`",
                    inline: false
                },
                {
                    name: "⚠️ Важливо",
                    value:
                        "• Заборонено фейкові звіти\n" +
                        "• Всі учасники мають бути реальними\n" +
                        "• Контракти перевіряються адміністрацією",
                    inline: false
                }
            )
            .setFooter({ text: "Legion Contract System" })
            .setTimestamp();

        await message.channel.send({
            embeds: [embed],
            components: [getContractButton()]
        });
    }
};