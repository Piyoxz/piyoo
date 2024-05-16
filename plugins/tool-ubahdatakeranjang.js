let handler = async (m, { conn, text }) => {
    if (m.isGroup && global.db.data.chats[m.chat].hitung_angka) {
        conn.hitung_angka = conn.hitung_angka ? conn.hitung_angka : {};
        let data = conn.hitung_angka[m.chat];

        if (!text) {
            await conn.reply(m.chat, "Mohon berikan nama keranjang yang ingin diubah.", m);
            return;
        }

        let namaKeranjangBaru = text.toLowerCase().trim();
        if (!data || !data.keranjang) {
            await conn.reply(m.chat, "Tidak ada data angka yang tersimpan.", m);
            return;
        }

        if (!data.keranjang[namaKeranjangBaru]) {
            await conn.reply(m.chat, `Keranjang dengan nama "${namaKeranjangBaru}" tidak ditemukan.`, m);
            return;
        }

        let dataKeranjangLama = data.keranjang[namaKeranjangBaru];

        delete data.keranjang[namaKeranjangBaru];

        data.keranjang[namaKeranjangBaru] = dataKeranjangLama;

        await conn.reply(m.chat, `Nama keranjang "${namaKeranjangBaru}" telah diubah dan menjadi keranjang yang paling baru.`, m);
    }
}

handler.command = /^(ubahisikeranjang)$/i

export default handler
