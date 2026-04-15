import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Забанити користувача")
        .addUserOption(opt =>
            opt.setName("user")
                .setDescription("Користувач")
                .setRequired(true))
        .addStringOption(opt =>
            opt.setName("reason")
                .setDescription("Причина")),

    async execute(interaction) {

        if (!interaction.memberPermissions.has("BanMembers")) {
            return interaction.reply({ content: "❌ Немає прав", ephemeral: true });
        }

        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason") || "Без причини";

        const member = await interaction.guild.members.fetch(user.id);

        await member.ban({ reason });

        await interaction.reply(`🔨 ${user.tag} забанений`);
    }
};