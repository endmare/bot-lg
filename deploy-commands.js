import { REST, Routes } from "discord.js";
import fs from "fs";
import config from "./config.js";

const commands = [];

const files = fs.readdirSync("./commands");

for (const file of files) {
    const cmd = await import(`./commands/${file}`);

    if (cmd.default?.data) {
        commands.push(cmd.default.data.toJSON());
    }
}

const rest = new REST({ version: "10" }).setToken(config.token);

try {
    console.log("⏳ Реєстрація slash команд...");

    await rest.put(
        Routes.applicationGuildCommands(
            config.clientId,
            config.guildId
        ),
        { body: commands }
    );

    console.log("✅ Команди оновлені!");
} catch (err) {
    console.error(err);
}