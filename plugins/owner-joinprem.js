let linkRegex = /https:\/\/chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/ig;

let handler = async (m, { conn, text, isOwner }) => {
    let extractedUrls = text.match(linkRegex);

    if (!extractedUrls) throw 'No valid WhatsApp group links found in the message';

    for (let i = 0; i < extractedUrls.length; i++) {
        let code = extractedUrls[i].replace(/https:\/\/chat.whatsapp.com\//i, '');
        await conn.groupAcceptInvite(code);
        await sleep(3000); // Delay for 3 seconds
    }
    m.reply("Berhasil Join Group");
}

handler.command = /^joinprem$/i;
handler.rowner = true;

export default handler;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
