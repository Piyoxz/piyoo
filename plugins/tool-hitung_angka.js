let handler = async(m, { conn }) => {
    if (m.isGroup && global.db.data.chats[m.chat].hitung_angka) {
        conn.hitung_angka = conn.hitung_angka ? conn.hitung_angka : {};
        let data = conn.hitung_angka[m.chat];
        if (data && data.angka && data.angka.length > 0) {
            let angka = data.angka;
            let numericAngka = angka.filter(val => !isNaN(parseFloat(val))).map(val => parseFloat(val));
            let total = numericAngka.reduce((acc, curr) => acc + curr, 0);
            let formattedTotal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(total);
            return m.reply(`Total: ${formattedTotal}`);
        }
    }
}

handler.command = /^(hitung)$/i
export default handler
