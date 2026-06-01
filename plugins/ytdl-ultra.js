// ✅ Coded by AHMADTech for AHMAD MD
// ⚙️ Advanced YouTube Video Downloader (Multi-Pattern Loop)

const { cmd } = require('../command');
const yts = require('yt-search');
const axios = require('axios');

// ──────────────────────────────────────────────────────────────────
// 📹 VIDEO DOWNLOADER LOOP
// ──────────────────────────────────────────────────────────────────

// Patterns define karein taaki menu mein commands zyada show hon
const videoPatterns = ["ytv", "video", "ytmp4", "ytvideo", "downloadvideo", "ytdl"];

videoPatterns.forEach((targetPattern) => {
    cmd({
        pattern: targetPattern,
        desc: "Download YouTube video (MP4) - Multi Pattern",
        category: "download",
        react: "📹",
        filename: __filename
    }, async (conn, mek, m, { from, q, reply }) => {
        try {
            if (!q) return await reply(
                `╭━━━━━━━━━━━━━━━╮\n` +
                `┃   📹 *VIDEO DOWNLOADER*   ┃\n` +
                `╰━━━━━━━━━━━━━━━╯\n\n` +
                `❗ Please provide a YouTube URL or video name!\n\n` +
                `*Command used:* .${targetPattern}\n` +
                `*Example:* .${targetPattern} alone marshmello`
            );

            let videoInfo = null;

            // 🔍 URL detect karo ya search karo
            if (q.startsWith('http://') || q.startsWith('https://')) {
                const videoId = q.match(
                    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
                )?.[1];
                if (!videoId) return await reply("❌ Invalid YouTube URL!");
                videoInfo = await yts({ videoId });
            } else {
                const search = await yts(q);
                videoInfo = search.videos[0];
            }

            if (!videoInfo) return await reply("❌ No results found!");

            const url = videoInfo.url;

            // 🖼️ Thumbnail + Info bhejo
            await conn.sendMessage(from, {
                image: { url: videoInfo.thumbnail },
                caption:
                    `╭━━━━━━━━━━━━━━━╮\n` +
                    `┃   🎬 *VIDEO FOUND*   ┃\n` +
                    `╰━━━━━━━━━━━━━━━╯\n\n` +
                    `🎞️ *Title :* ${videoInfo.title}\n` +
                    `📺 *Channel :* ${videoInfo.author.name}\n` +
                    `🕒 *Duration :* ${videoInfo.timestamp}\n\n` +
                    `⏳ *Status :* Downloading via .${targetPattern}...\n\n` +
                    `> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩*`
            }, { quoted: mek });

            // ⚙️ API se download link lo
            const apiUrl = `https://jawad-tech.vercel.app/download/ytdl?url=${encodeURIComponent(url)}`;
            const response = await axios.get(apiUrl, { timeout: 60000 });
            const data = response.data;

            if (!data?.status || !data?.result?.mp4) {
                return await reply("❌ Download failed! API error.");
            }

            // 📹 Video bhejo
            await conn.sendMessage(from, {
                video: { url: data.result.mp4 },
                caption:
                    `╭━━━━━━━━━━━━━━━╮\n` +
                    `┃   ✅ *DOWNLOADED*   ┃\n` +
                    `╰━━━━━━━━━━━━━━━╯\n\n` +
                    `🎬 *${videoInfo.title}*\n` +
                    `📥 *Command:* .${targetPattern}\n\n` +
                    `> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩*`
            }, { quoted: mek });

            await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

        } catch (e) {
            console.error(`[${targetPattern.toUpperCase()} ERROR]:`, e.message);
            await reply("⚠️ Error occurred while processing your request.");
        }
    });
});
