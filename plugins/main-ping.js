,const config = require('../config');
const { cmd, commands } = require('../command');

// --- PING COMMAND (BUG SYSTEM STYLE) ---
cmd({
    pattern: "ping",
    alias: ["speed","pong"],
    use: '.ping',
    desc: "Check system exploit response latency.",
    category: "main",
    react: "☣️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        const start = new Date().getTime();

        const reactionEmojis = ['☣️', '☠️', '🩸', '⚡', '⚠️'];
        const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];

        // Quick hacker reaction
        await conn.sendMessage(from, {
            react: { text: reactionEmoji, key: mek.key }
        });

        const end = new Date().getTime();
        const responseTime = (end - start) / 1000;

        // Hacker Terminal Style Text
        const text = `*☠️ PONG...!! SYSTEM RESPONDING* 📡\n\n*🩸 LATENCY:* ${responseTime.toFixed(2)}ms\n*☣️ INJECTION:* Active\n\n> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀʜᴍᴀᴅ-ᴍᴅ*`;

        await conn.sendMessage(from, {
            text,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363426472060176@newsletter',
                    newsletterName: "AHMADTech",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in ping command:", e);
        reply(`⚠️ Error: ${e.message}`);
    }
});

// --- PING2 COMMAND (CRASH TERMINAL UI) ---
cmd({
    pattern: "ping2",
    desc: "Check exploit dashboard speed status.",
    category: "main",
    react: "🩸",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const startTime = Date.now();
        await new Promise(resolve => setTimeout(resolve, 500));
        const endTime = Date.now();
        const ping = endTime - startTime;

        let status;
        let indicator;
        if (ping < 1000) {
            status = "𝐄𝐱𝐜𝐞𝐥𝐥𝐞𝐧𝐭";
            indicator = "☣️";
        } else if (ping < 1500) {
            status = "𝐆𝐨ｏ𝐝";
            indicator = "⚠️";
        } else {
            status = "𝐋𝐚𝐠𝐠𝐲";
            indicator = "☠️";
        }

        // Bug Bot Dashboard Design
        const msg = `
*⚡️ 🩸 AHMAD-MD TERMINAL STATUS 🩸 ⚡️*

*┏────────────────────────┓*
*┃ 📡 EXPLOIT SPEED:* ${ping} ms
*┃ 🧠 PACKET STATUS:* ${status} ${indicator}
*┃ ⚡ ENGINE MODE:* Stable
*┃ 🛰️ DATABASE:* Corrupt-Online
*┗────────────────────────┛*

> *Created by Ahmad Hassan*`;

        await conn.sendMessage(from, { 
            text: msg.trim(),
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363426472060176@newsletter',
                    newsletterName: "AHMADTech",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`⚠️ Error: ${e.message}`);
    }
});
            
