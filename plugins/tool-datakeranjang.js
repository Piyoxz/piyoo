let handler = async (m, { conn, text }) => {
    if (m.isGroup && global.db.data.chats[m.chat].hitung_angka) {
        conn.hitung_angka = conn.hitung_angka ? conn.hitung_angka : {};
        let data = conn.hitung_angka[m.chat];

        if (!text || text.includes("#semua")) {
            if (data && data.keranjang) {
                let pesan = `Data angka yang tersimpan:\n\n`;
                for (let namaKeranjang in data.keranjang) {
                    pesan += `Keranjang "${namaKeranjang}":\n`;
                    data.keranjang[namaKeranjang].forEach((objek, index) => {
                        pesan += `${index + 1}. ${objek.value.toLocaleString("id-ID")}\n`;
                    });
                    let total = data.keranjang[namaKeranjang].reduce((acc, curr) => acc + curr.value, 0);
                    pesan += `Total: ${total.toLocaleString("id-ID")}\n\n`;
                }
                await conn.reply(m.chat, pesan, m);
                return;
            } else {
                await conn.reply(m.chat, "Tidak ada data angka yang tersimpan.", m);
                return;
            }
        }

        let today = new Date().toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta" });
        let namaKeranjang = text.toLowerCase().trim();
        if (data && data.keranjang && data.keranjang[namaKeranjang]) {
            let pesan = `Angka yang tersimpan dalam keranjang "${namaKeranjang}" untuk hari ini:\n\n`;
            data.keranjang[namaKeranjang].forEach((objek, index) => {
                if (objek.waktu.includes(today)) { 
                    pesan += `${index + 1}. ${objek.value.toLocaleString("id-ID")}\n`;
                }
            });

            let total = data.keranjang[namaKeranjang].filter(objek => objek.waktu.includes(today))
                .reduce((acc, curr) => acc + curr.value, 0);
            pesan += `\nTotal hari ini: ${total.toLocaleString("id-ID")}`;

            await conn.reply(m.chat, pesan, m);
            return;
        }

    }
}

handler.command = /^(data)$/i

export default handler
