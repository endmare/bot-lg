import { sendLog } from "../utils/logger.js";

export default {
    name: "kick",
    async execute(message, args, client) {
        if (!message.member.permissions.has("KickMembers")) {
            return message.reply("❌ Немає прав");
        }

        const member = message.mentions.members.first();
        if (!member) return message.reply("⚠️ Вкажи користувача");

        const reason = args.slice(1).join(" ") || "Без причини";

        await member.kick(reason);

        await message.channel.send(`👢 ${member.user.tag} кікнутий`);

        await sendLog(client,
            `👢 ${message.author.tag} кікнув ${member.user.tag} | Причина: ${reason}`
        );
    }
};