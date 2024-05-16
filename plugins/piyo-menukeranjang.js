let handler = async (m, { conn }) => {
    if (m.isGroup && global.db.data.chats[m.chat].hitung_angka) {
        let text = "*Menu Data*\nSilakan pilih perintah yang ingin Anda jalankan:\n\n" +
            "1. .buatdata\n" +
            "2. .data\n" +
            "3. .ubahisikeranjang\n" +
            "4. .resetdata";
        return await conn.reply(m.chat, text, m)
    }
}

handler.command = /^(menudata)$/i

export default handler
