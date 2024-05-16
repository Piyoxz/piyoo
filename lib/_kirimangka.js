export async function before(m, { conn }) {
    console.log(global.db.data.chats[m.chat].hitung_angka)  
  if (m.isGroup && global.db.data.chats[m.chat].hitung_angka) {
    conn.hitung_angka = conn.hitung_angka ? conn.hitung_angka : {};
    conn.hitung_angka[m.chat] = conn.hitung_angka[m.chat] || { angka: [] };
    let angkanya = parseFloat(m.text.replace(/\./g, ""));
    if (!isNaN(angkanya)) {
      conn.hitung_angka[m.chat].angka.push(angkanya);
      let pesan = "Angka yang tersimpan:\n\n";
      conn.hitung_angka[m.chat].angka.forEach((angka, index) => {
        pesan += `${index + 1}. ${angka}\n`;
      });
      await m.reply(pesan);
    }
  }
}
