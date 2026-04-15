export function handleAutoPing(message, client) {
    const triggers = ["збір", "сбор", "go"];

    if (triggers.some(word => message.content.toLowerCase().includes(word))) {

        const roleId = client.config.autoPingRoleId;

        const text =
`📢 **ОГОЛОШЕННЯ ЗБОРУ СІМ'Ї**

━━━━━━━━━━━━━━━━━━
⚔️ **СТАТУС:** ТЕРМІНОВИЙ ЗБІР
📍 **ІНІЦІАТОР:** ЛІДЕР СІМ'Ї
━━━━━━━━━━━━━━━━━━

<@&${roleId}>

🔥 **УВАГА ВСІМ УЧАСНИКАМ LEGION!**

Зараз оголошено загальний збір сім'ї.  
Всі активні учасники зобов’язані з’явитися якнайшвидше.

━━━━━━━━━━━━━━━━━━
📌 **ПРИЧИНА:**
Оперативне внутрішнє зібрання / інструктаж

⚠️ **НЕ ІГНОРУВАТИ**
Відсутність без причини = фіксується як неактивність

━━━━━━━━━━━━━━━━━━
🧠 **LEGION — дисципліна, структура, повага**
`;

        message.channel.send({
            content: text
        });
    }
}