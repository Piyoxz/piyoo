let handler = async (m, { conn, text }) => {
    if (m.isGroup && global.db.data.chats[m.chat].hitung_angka) {
        conn.hitung_angka = conn.hitung_angka ? conn.hitung_angka : {};
        let data = conn.hitung_angka[m.chat];
        if (!data) data = conn.hitung_angka[m.chat] = { keranjang: {} };

        let namaKeranjang = text.toLowerCase().trim();

        if (data.keranjang[namaKeranjang]) {
            await m.reply(`Keranjang dengan nama "${namaKeranjang}" sudah ada.`);
            return;
        }

        data.keranjang[namaKeranjang] = [];
        
        await m.reply(`Keranjang dengan nama "${namaKeranjang}" telah dibuat.`);
    }
}

handler.command = /^(buatdata)$/i

export default handler
