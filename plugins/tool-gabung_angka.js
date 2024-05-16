let handler = async(m, { conn }) => {
    if (m.isGroup && global.db.data.chats[m.chat].hitung_angka) {
        conn.hitung_angka = conn.hitung_angka ? conn.hitung_angka : {};
        let data = conn.hitung_angka[m.chat];
        if (data && data.angka && data.angka.length > 0) {
            let angka = data.angka;
            let hasil = angka.join("\n");
            return m.reply(hasil);
        }
    }
}

handler.command = /^(gabung)$/i
export default handler
