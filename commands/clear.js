import { sendLog } from "../utils/logger.js";

export default {
    name: "clear",
    async execute(message, args, client) {
        if (!message.member.permissions.has("ManageMessages")) {
            return message.reply("❌ Немає прав");
        }

        const amount = parseInt(args[0]);

        if (!amount || amount < 1 || amount > 25) {
            return message.reply("⚠️ Вкажи число 1-25");
        }

        await message.channel.bulkDelete(amount, true);

        await message.channel.send(`🧹 Видалено ${amount} повідомлень`);

        await sendLog(client,
            `🧹 ${message.author.tag} видалив ${amount} повідомлень (#${message.channel.name})`
        );
    }
};