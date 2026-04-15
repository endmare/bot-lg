import fs from "fs";

const path = "./database/users.json";

function load() {
    return JSON.parse(fs.readFileSync(path, "utf8"));
}

function save(data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

// 💬 повідомлення
export function addMessage(userId) {
    const data = load();

    if (!data[userId]) data[userId] = { messages: 0, voice: 0 };

    data[userId].messages++;

    save(data);
}

// 🎤 голос
const voiceMap = new Map();

export function handleVoice(oldState, newState) {
    const id = newState.id;

    if (!oldState.channel && newState.channel) {
        voiceMap.set(id, Date.now());
    }

    if (oldState.channel && !newState.channel) {
        const start = voiceMap.get(id);
        if (!start) return;

        const time = Math.floor((Date.now() - start) / 1000);

        const data = load();
        if (!data[id]) data[id] = { messages: 0, voice: 0 };

        data[id].voice += time;

        save(data);
        voiceMap.delete(id);
    }
}

// 🏆 топ
export function getTop() {
    const data = load();

    return Object.entries(data)
        .sort((a, b) =>
            (b[1].messages + b[1].voice) -
            (a[1].messages + a[1].voice)
        )
        .slice(0, 10);
}