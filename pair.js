const express = require('express');
const fs = require('fs');
const { exec } = require("child_process");
let router = express.Router()
const pino = require("pino");
const {
    default: makeWASocket,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers,
    jidNormalizedUser
} = require("@whiskeysockets/baileys");
const { upload } = require('./mega');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    let num = req.query.number;
    async function princess_olya_pairPair() {
        const { state, saveCreds } = await useMultiFileAuthState(`./session`);
        try {
            let princess_olya_pairPairWeb = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                browser: Browsers.macOS("Safari"),
            });

            if (!princess_olya_pairPairWeb.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await princess_olya_pairPairWeb.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            princess_olya_pairPairWeb.ev.on('creds.update', saveCreds);
            princess_olya_pairPairWeb.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;
                if (connection === "open") {
                    try {
                        await delay(10000);
                        const sessionprincess_olya_pair = fs.readFileSync('./session/creds.json');

                        const auth_path = './session/';
                        const user_jid = jidNormalizedUser(princess_olya_pairPairWeb.user.id);

                        
            function randomMegaId(length = 6, numberLength = 4) {
                const characters =
                  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                let result = "";
                for (let i = 0; i < length; i++) {
                  result += characters.charAt(
                    Math.floor(Math.random() * characters.length)
                  );
                }
                const number = Math.floor(
                  Math.random() * Math.pow(10, numberLength)
                );
                return `${result}${number}`;
              }
  

                        const mega_url = await upload(fs.createReadStream(auth_path + 'creds.json'), `${randomMegaId()}.json`);

                        const string_session = mega_url.replace('https://mega.nz/file/',);

                        
            const sid = `╭─「 *Princess Olya* 💙✨ 」─❂\n┊📍╭───────────❂\n┊📍┊Princess Olya 💙\n┊📍┊By Wolf Mare.\n┊📍╰───────────❂\n┊📍┊⬤ V 1.0.1\n┊📍┊⬤ Yt Fix ✅\n┊📍┊⬤ list Fix ✅\n┊📍┊⬤ Hide Bug Fix ✅\n┊📍╰───────────❂\n╰──────────────❂\n\n\n_*ꜱᴇꜱꜱɪᴏɴ ꜱᴜᴄꜱᴇꜱꜱꜰᴜʟʟʏ ᴅᴏᴡɴʟᴏᴀᴅᴇᴅ ✅*_\n\n> ${string_session}\n\n☝️ This is the your Session ID\n\n\n\n\n╭─「 *Control Unit* 」─❂\n┊📍╭───────────❂\n┊📍┊ 🔄 Main Com.\n┊📍┊  👇 For Menu\n┊📍┊  _.menu_\n┊📍┊  👇 Test Alive\n┊📍┊  _.alive_\n┊📍┊ \n┊📍┊ 👤 Issue To Owner \n┊📍┊  👇 Whatsapp\n┊📍┊ _https://wa.link/kqggyq_\n┊📍┊ \n┊📍╰──────────❂\n╰──────────────❂ \n\n╭─ 「 Team 」 ─❂\n┊📍┊ *Wolf Mare*\n┊📍┊ *Proudly Present.*\n╰────────────┈\n\n\n* Princess Olya Official\n*Crated By,*\n*Team Wolf Mare*\n\n\n> All Rights Reserved 2k25.`;
            const mg = `🚫 _*Don,t share your session id to anyone.*_\n_*---------------*_\n\n> Princess Olya.💙\n> By Wolf Mare 🤍`;
            const dt = await princess_olya_pairPairWeb.sendMessage(user_jid, {
              image: {
                url: "https://raw.githubusercontent.com/Princessolya/Princess-Olya-Media-Files/refs/heads/main/Session%20success.jpg",
              },
              caption: sid,
            });
            const msg = await princess_olya_pairPairWeb.sendMessage(user_jid, {
              text: string_session,
            });
            const msg1 = await princess_olya_pairPairWeb.sendMessage(user_jid, { text: mg });

                    } catch (e) {
                        exec('pm2 restart princess_olya_pair');
                    }

                    await delay(100);
                    return await removeFile('./session');
                    process.exit(0);
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode !== 401) {
                    await delay(10000);
                    princess_olya_pairPair();
                }
            });
        } catch (err) {
            exec('pm2 restart princess_olya_pair');
            console.log("service restarted");
            princess_olya_pairPair();
            await removeFile('./session');
            if (!res.headersSent) {
                await res.send({ code: "Service Unavailable" });
            }
        }
    }
    return await princess_olya_pairPair();
});

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
    exec('pm2 restart princess_olya_pair');
});


module.exports = router;
