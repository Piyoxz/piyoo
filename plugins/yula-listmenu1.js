import PhoneNumber from 'awesome-phonenumber'
import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import os from 'os'
import fs from 'fs'
let tags = {
  'absen': '𝙰𝙱𝚂𝙴𝙽',
  'adminry': '𝙰𝙳𝙼𝙸𝙽',
  'ai': '𝙰𝙸',
  'anime': '𝙰𝙽𝙸𝙼𝙴 𝙰𝙽𝙳 𝙼𝙰𝙽𝙶𝙰',
  'audio': '𝙰𝚄𝙳𝙸𝙾 𝙴𝙳𝙸𝚃𝙸𝙽𝙶',
  'downloader': '𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁',
  'fun': '𝙵𝚄𝙽',
  'game': '𝙶𝙰𝙼𝙴',
  'group': '𝙶𝚁𝙾𝚄𝙿',
  'info': '𝙸𝙽𝙵𝙾',
  'internet': '𝙸𝙽𝚃𝙴𝚁𝙽𝙴𝚃',
  'islamic': '𝙸𝚂𝙻𝙰𝙼𝙸𝙲',
  'kerang': '𝙺𝙴𝚁𝙰𝙽𝙶 𝙰𝙹𝙰𝙸𝙱',
  'maker': '𝙼𝙰𝙺𝙴𝚁',
  'news': '𝙽𝙴𝚆𝚂',
  'nsfw': '𝙽𝚂𝙵𝚆',
  'nulis': '𝙼𝙰𝙶𝙴𝚁𝙽𝚄𝙻𝙸𝚂 𝙰𝙽𝙳 𝙻𝙾𝙶𝙾',
  'owner': '𝙾𝚆𝙽𝙴𝚁',
  'premium': '𝙿𝚁𝙴𝙼𝙸𝚄𝙼',
  'primbon': '𝙿𝚁𝙸𝙼𝙱𝙾𝙽',
  'quotes': '𝚀𝚄𝙾𝚃𝙴𝚂',
  'random': '𝚁𝙰𝙽𝙳𝙾𝙼',
  'rpg': '𝚁𝙿𝙶 𝙶𝙰𝙼𝙴',
  'search': '𝚂𝙴𝙰𝚁𝙲𝙷𝙸𝙽𝙶',
  'sticker': '𝚂𝚃𝙸𝙲𝙺𝙴𝚁',
  'store': '𝚂𝚃𝙾𝚁𝙴',
  'tools': '𝚃𝙾𝙾𝙻𝚂',
  'vote': '𝚅𝙾𝚃𝙸𝙽𝙶',
  'xp': '𝙴𝚇𝙿 𝙰𝙽𝙳 𝙻𝙸𝙼𝙸𝚃',
}
const defaultMenu = {
  before: `Hi %name.\nMy name is Piyobot. I'm here to help you with tasks like searching for information online, retrieving data, etc. By utilizing innovative features, I will help you to move more quickly and productively in completing your work.

*「 I N F O  P I Y O 」*
 •  *Your Premium :* %prems
 •  *Your Limits :* %limit
 •  *Versions :* %version
 •  *Today's request :* %totalreg 
 •  *Database :* mongoDB

%readmore
`.trimStart(),
  header: '*┌ •「 %category  」*',
  body: '*│ •* %cmd',
  footer: '*└* ',
  after: 'piyobot',
}


let handler = async (m, { conn, usedPrefix, __dirname }) => {
  try {
    //conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
    let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let tag = `@${m.sender.split`@`[0]}`
    let image = elainajpg.getRandom()
    let user = global.db.data.users[m.sender]
    let limit = user.premiumTime >= 1 ? 'Unlimited' : user.limit
    let name = `${user.registered ? user.name : conn.getName(m.sender)}`
    let premium = global.db.data.users[m.sender].premiumTime
    let prems = `${premium > 0 ? 'Premium': 'Free'}`
    let status = `${m.sender.split`@`[0] == info.nomorown ? 'Developer' : user.premiumTime >= 1 ? 'Premium User' : user.level >= 1000 ? 'Elite User' : 'Free User'}`
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '🅛' : '')
                .replace(/%isPremium/g, menu.premium ? '🅟' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: usedPrefix, uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      level, limit, name, prems, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role, tag, status, wib,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
conn.sendMessage(m.chat, { text: text, contextInfo: { mentionedJid: [m.sender], externalAdReply: { showAdAttribution: false, title: 'Piyobot 💕', body: 'Jangan Lupa Sewa', thumbnailUrl: 'https://telegra.ph/file/788304dc51334f8d5d8b8.jpg', mediaType: 1, sourceUrl: 'https://chat.whatsapp.com/IY8OvPk02qxKb1xd0DXtUR', renderLargerThumbnail: false }}}, { quoted: m })
          
  } catch (e) {
    throw e
  }
}
handler.help = ['menu']
handler.command = /^(menu|help|\?)$/i
handler.register = true
export default handler


const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function wish() {
    let wishloc = ''
  const time = moment.tz('Asia/Jakarta').format('HH')
  wishloc = ('Hi')
  if (time >= 0) {
    wishloc = ('Selamat Malam')
  }
  if (time >= 4) {
    wishloc = ('Selamat Pagi')
  }
  if (time >= 11) {
    wishloc = ('Selamat Siang')
  }
  if (time >= 15) {
    wishloc = ('️Selamat Sore')
  }
  if (time >= 18) {
  	wishloc = ('Selamat Malam')
  }
  if (time >= 23) {
    wishloc = ('Selamat Malam')
  }
  return wishloc
}

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}