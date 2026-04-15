import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Збір сім'ї"),

    async execute(interaction) {

        const roleId = interaction.client.config.leaderRoleId;

        return interaction.reply({
            content: `<@&${roleId}> Лідер сім'ї проводить загальний збір сім'ї!`
        });
    }
};