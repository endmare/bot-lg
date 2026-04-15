export async function sendLog(client, text) {
    const ch = await client.channels.fetch(client.config.logChannelId);
    if (ch) ch.send(text);
}