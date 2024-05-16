let handler = async(m, { conn, text }) => {
    if (m.isGroup && global.db.data.chats[m.chat].hitung_angka) {
        conn.hitung_angka = conn.hitung_angka ? conn.hitung_angka : {};
        let data = conn.hitung_angka[m.chat];
        
        if (!text) {
            if (data && data.keranjang) {
                let namaKeranjangTerbaru = Object.keys(data.keranjang).pop();
                data.keranjang[namaKeranjangTerbaru] = [];
                return m.reply(`Keranjang "${namaKeranjangTerbaru}" telah direset.`);
            } else {
                return m.reply("Tidak ada data angka yang tersimpan.");
            }
        }

        let namaKeranjang = text.toLowerCase().trim();
        if (data && data.keranjang && data.keranjang[namaKeranjang]) {
            data.keranjang[namaKeranjang] = [];
            return m.reply(`Keranjang "${namaKeranjang}" telah direset.`);
        } else {
            return m.reply(`Keranjang dengan nama "${namaKeranjang}" tidak ditemukan.`);
        }
    }
}

handler.command = /^(resetdata)$/i

export default handler
