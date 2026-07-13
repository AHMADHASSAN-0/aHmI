const config = require('../config')
const { cmd, commands } = require('../command');
const path = require('path');
const os = require("os")
const fs = require('fs');
const {runtime} = require('../lib/functions')
const axios = require('axios')

const toSmallCaps = (text) => {
    if (!text || typeof text !== 'string') return '';
    const smallCapsMap = {
        'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ғ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ',
        'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ',
        's': 's', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ'
    };
    return text.toLowerCase().split('').map(char => smallCapsMap[char] || char).join('');
};

// --- NORMAL CATEGORY STYLE ---
const formatCategory = (category, cmds) => {
    const validCmds = cmds.filter(cmd => cmd.pattern && cmd.pattern.trim() !== '');
    if (validCmds.length === 0) return ''; 
    
    let title = `\n*☠️ ───⪼ ⟦ ${category.toUpperCase()} ⟧ ⪻─── ☠️*\n`;
    let body = validCmds.map(cmd => `*☣️ 🔓* .${toSmallCaps(cmd.pattern)}`).join('\n');
    let footer = `\n*⚠️ ───────────────────────*\n`;
    return `${title}${body}${footer}`;
};

cmd({
    pattern: "menu",
    alias: ["m", "help", "allmenu", "bugmenu"],
    category: "main",
    react: "☣️",
    filename: __filename
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
        const categories = [...new Set(Object.values(commands).map(c => c.category))].filter(Boolean);
        
        let bugSections = '';
        let normalSections = '';

        // Bug category ko sabse pehle aur alag show karne ke liye logic
        categories.forEach(cat => {
            const catCmds = Object.values(commands).filter(c => c.category === cat);
            
            if (cat.toLowerCase() === 'bug' || cat.toLowerCase() === 'crash') {
                bugSections += `\n*⚡️ 🔥 ━━━〔 🔥 VIP BUG MENU 🔥 〕━━━ 🔥 ⚡️*\n`;
                bugSections += catCmds.map(cmd => `*⚡☠️* .${toSmallCaps(cmd.pattern)}`).join('\n');
                bugSections += `\n*🛑 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 🛑*\n`;
            } else {
                normalSections += formatCategory(cat, catCmds);
            }
        });

        // Dono ko combine karna (Bug commands hamesha shuru mein aayengi)
        let menuSections = bugSections + normalSections;

        const BOT_NAME = config.BOT_NAME || "AHMAD-MD";
        const uptime = runtime(process.uptime());

        // --- GLITCH / HACKER INTERFACE DESIGN ---
        let dec = `
*⚡️ 🩸 ${BOT_NAME.toUpperCase()} CRASH SYSTEM 🩸 ⚡️*

*⚠️ WARNING: USE WITH CAUTION ⚠️*

*┏────────────────────────┓*
*┃ 👤 EXPLOITER:* ${pushname || "Target"}
*┃ 💀 CODENAME:* ${config.OWNER_NAME || "Ahmad Hassan"}
*┃ ⏳ ONLINE:* ${uptime}
*┃ 🗂️ EXPLOITS:* ${Object.keys(commands).length} Loaded
*┃ ⚙️ ENGINE:* ${config.MODE || "Public"}
*┗────────────────────────┛*

${menuSections}
*☠️ SYSTEM CORRUPTED ☠️*
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀʜᴍᴀᴅ ʜᴀssᴀɴ*`;

        // Catbox PNG Image URL
        let imageToUse = "https://files.catbox.moe/mo66ob.png";

        await conn.sendMessage(from, { 
            image: { url: imageToUse },
            caption: dec, 
            contextInfo: { 
                mentionedJid: [m.sender], 
                forwardingScore: 999, 
                isForwarded: true, 
                forwardedNewsletterMessageInfo: { 
                    newsletterJid: '120363426472060176@newsletter', 
                    newsletterName: "AHMADTech", 
                    serverMessageId: 143 
                } 
            } 
        }, { quoted: mek });

        await conn.sendMessage(from, {
            audio: { url: "https://files.catbox.moe/hoi9ur.mp3" },
            mimetype: 'audio/mpeg',
            ptt: false
        }, { quoted: mek });

    } catch (e) { 
        reply(`Error: ${e.message}`); 
    } 
});
