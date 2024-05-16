export async function before(m, { conn }) {
    if (m.isGroup && global.db.data.chats[m.chat].hitung_angka) {
        conn.hitung_angka = conn.hitung_angka ? conn.hitung_angka : {};
        let data = conn.hitung_angka[m.chat];
        if (data && data.keranjang) {
            let objek = {};
            objek.value = parseFloat(m.text.replace(/\./g, "")); 
            objek.waktu = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });

            if (!isNaN(objek.value)) {
                let namaKeranjang = Object.keys(data.keranjang).pop();
                data.keranjang[namaKeranjang].push(objek);

                let total = data.keranjang[namaKeranjang].reduce((acc, curr) => acc + curr.value, 0);

                let pesan = `Objek yang tersimpan dalam keranjang "${namaKeranjang}":\n\n`;
                data.keranjang[namaKeranjang].forEach((item, index) => {
                    pesan += `${index + 1}. ${item.value.toLocaleString("id-ID")}\n`;
                });

                pesan += `\nTotal: ${total.toLocaleString("id-ID")}`;

                await m.reply(pesan);
            }
        }
    }
}
