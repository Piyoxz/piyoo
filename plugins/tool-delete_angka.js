let handler = async(m, { conn }) => {
    if (m.isGroup && global.db.data.chats[m.chat].hitung_angka) {
        conn.hitung_angka = conn.hitung_angka ? conn.hitung_angka : {};
        let data = conn.hitung_angka[m.chat];

        if (data && data.keranjang) {
            let namaKeranjangTerbaru = Object.keys(data.keranjang).pop(); // Mengambil nama keranjang terbaru
            let pesanDikutip = m.quoted && m.quoted.text ? m.quoted.text : ''; // Mengambil pesan yang dikutip

            let angkaDihapus = pesanDikutip.match(/\d+(\.\d+)?/); // Mengambil angka dari pesan yang dikutip
            if (!angkaDihapus) {
                await conn.reply(m.chat, 'Tidak ada angka yang ditemukan dalam pesan yang dikutip.', m);
                return;
            }

            angkaDihapus = parseFloat(angkaDihapus[0].replace(/\./g, '').replace(/,/g, '.')); // Konversi angka ke format yang sesuai

            // Mencari indeks angka yang akan dihapus dalam keranjang terbaru
            let index = data.keranjang[namaKeranjangTerbaru].findIndex(produk => produk.value === angkaDihapus);

            if (index !== -1) {
                // Menghapus angka dari keranjang terbaru
                data.keranjang[namaKeranjangTerbaru].splice(index, 1);
                await conn.reply(m.chat, `Angka ${angkaDihapus} telah dihapus dari keranjang "${namaKeranjangTerbaru}".`, m);
            } else {
                await conn.reply(m.chat, `Angka ${angkaDihapus} tidak ditemukan dalam keranjang "${namaKeranjangTerbaru}".`, m);
            }
        }
    }
}

handler.command = /^(deleteangka)$/i
export default handler
