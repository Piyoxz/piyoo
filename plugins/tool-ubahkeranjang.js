let handler = async (m, { conn, text }) => {
    if (m.isGroup && global.db.data.chats[m.chat].hitung_angka) {
        conn.hitung_angka = conn.hitung_angka ? conn.hitung_angka : {};
        let data = conn.hitung_angka[m.chat];

        let [namaBaru, namaLama] = text.toLowerCase().split('#');
        if (!namaBaru || !namaLama) {
            return conn.reply(m.chat, 'Format pesan salah. Mohon gunakan format: ubahdata <nama_baru>#<nama_lama>', m);
        }

        if (data && data.keranjang && data.keranjang[namaLama]) {
            data.keranjang[namaBaru] = data.keranjang[namaLama];
            delete data.keranjang[namaLama];

            return conn.reply(m.chat, `Nama keranjang "${namaLama}" berhasil diubah menjadi "${namaBaru}".`, m);
        } else {
            return conn.reply(m.chat, `Keranjang dengan nama "${namaLama}" tidak ditemukan.`, m);
        }
    }
}

handler.command = /^(ubahdata)$/i

export default handler
