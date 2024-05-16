let handler = async (m, { conn, text }) => {
  let user = global.db.data.users[m.sender]
  user.afk = + new Date
  user.afkReason = text
  conn.reply(m.chat, `@${m.sender.split('@')[0]} sekarang AFK ${text ? '\nDengan Alasan : ' + text : 'Tanpa Alasan'}
  `, m , { mentions: [m.sender] })
  }
handler.help = ['afk <alasan>']
handler.tags = ['group']
handler.command = /^afk$/i
handler.group = true

export default handler