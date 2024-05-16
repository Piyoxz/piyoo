/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/handler-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import fg from "api-dylux" 
 import { 
     youtubedl, 
     youtubedlv2 
 } from "@bochilteam/scraper" 
 import fetch from "node-fetch" 
 import ytdl from "ytdl-core" 
  
 let limit = 80 
 let handler = async (m, { 
     conn, 
     args, 
     isPrems, 
     isOwner, 
     usedPrefix, 
     command 
 }) => { 
     if (!args || !args[0]) throw `Masukkan link dari youtube\n\n⌕ Contoh Pemakaian :\n${usedPrefix + command} https://youtu.be/YzkTFFwxtXI` 
     if (!args[0].match(/youtu/gi)) throw `Pastikan bahwa link benar-benar berasal dari youtube` 
     let q = args[1] || "360p" 
     let v = args[0] 
     m.reply(wait)
  
     try { 
  
 	 console.log('halo')
         let item = await ytmp4(args[0], q.split("p")[0]) 
         if ((item.contentLength).split("MB")[0] >= limit) return m.reply(` ≡  *Youtube Downloader*\n\n*◦ Ukuran* : ${item.contentLength}\n*◦ Kualitas* : ${item.quality}\n\n_File melebihi batas unduhan_*+${limit} MB*\n\n*Link:*\n${await shortUrl(item.videoUrl)}`) 
         let captvid = `*[ ⌕ H A S I L ⌕ ]* 
  
◦ *URL Gambar:* ${item.thumb.url || 'Tidak diketahui'} 
◦ *Judul:* ${item.title || 'Tidak diketahui'} 
◦ *Tanggal:* ${item.date || 'Tidak diketahui'} 
◦ *Durasi:* ${item.duration || 'Tidak diketahui'} 
◦ *Channel:* ${item.channel || 'Tidak diketahui'} 
◦ *Kualitas:* ${item.quality || 'Tidak diketahui'} 
◦ *Panjang Konten:* ${item.contentLength || 'Tidak diketahui'} 
◦ *Deskripsi:* ${item.description || 'Tidak diketahui'} 
 `.trim() 
         let dls = "Download Video Berhasil" 
         let doc = { 
             video: { 
                 url: item.videoUrl 
             }, 
             mimetype: "video/mp4", 
             caption: captvid, 
             contextInfo: { 
                 externalAdReply: { 
                     showAdAttribution: true, 
                     mediaType: 2, 
                     mediaUrl: v, 
                     title: item.title, 
                     body: dls, 
                     sourceUrl: v, 
                     thumbnail: await (await conn.getFile(item.image)).data 
                 } 
             } 
         } 
  
         await conn.sendMessage(m.chat, doc, { 
             quoted: m 
         }) 
  
     } catch { 
         try { 
  
             const yt = await youtubedl(v).catch(async () => await youtubedlv2(v)) 
             const dl_url = await yt.video[q].download() 
             const title = await yt.title 
             const size = await yt.video[q].fileSizeH 
  
             if (size.split("MB")[0] >= limit) return m.reply(` ≡  *Youtube Downloader*\n\n*◦ Ukuran* : ${size}\n*◦ Kualitas* : ${q}\n\n_File melebihi batas unduhan_*+${limit} MB*\n\n*Link:*\n${await shortUrl(dl_url)}`) 
             let captvid = `*[ ⌕ H A S I L ⌕ ]* 
    
◦ *Judul* : ${title || 'Tidak diketahui'} 
◦ *Ext* : mp4 
◦ *Kualitas* : ${q || 'Tidak diketahui'} 
◦ *Ukuran* : ${size || 'Tidak diketahui'} 
 `.trim() 
             let dls = "Download Video Berhasil" 
             let doc = { 
                 video: { 
                     url: dl_url 
                 }, 
                 mimetype: "video/mp4", 
                 caption: captvid, 
                 contextInfo: { 
                     externalAdReply: { 
                         showAdAttribution: true, 
                         mediaType: 2, 
                         mediaUrl: v, 
                         title: title, 
                         body: dls, 
                         sourceUrl: v, 
                         thumbnail: await (await conn.getFile(yt.thumbnail)).data 
                     } 
                 } 
             } 
  
             await conn.sendMessage(m.chat, doc, { 
                 quoted: m 
             }) 
  
  
         } catch (e) { 
             try { 
  
                 const { 
                     title, 
                     result, 
                     quality, 
                     size, 
                     duration, 
                     thumb, 
                     channel 
                 } = await fg.ytv(args[0]) 
  
                 if (size.split("MB")[0] >= limit) return m.reply(` ≡  *Youtube Downloader*\n\n*◦ Ukuran* : ${size}\n*◦ Kualitas* : ${quality}\n\n_File melebihi batas unduhan_*+${limit} MB*\n\n*Link:*\n${await shortUrl(result)}`) 
                 let captvid = `*[ ⌕ H A S I L ⌕ ]* 
    
◦ *Judul* : ${title || 'Tidak diketahui'} 
◦ *Ext* : mp4 
◦ *Kualitas* : ${quality || 'Tidak diketahui'} 
◦ *Ukuran* : ${size || 'Tidak diketahui'} 
◦ *Durasi* : ${duration || 'Tidak diketahui'} 
 `.trim() 
                 let dls = "Download Video Berhasil" 
                 let doc = { 
                     video: { 
                         url: result 
                     }, 
                     mimetype: "video/mp4", 
                     caption: captvid, 
                     contextInfo: { 
                         externalAdReply: { 
                             showAdAttribution: true, 
                             mediaType: 2, 
                             mediaUrl: v, 
                             title: title, 
                             body: dls, 
                             sourceUrl: v, 
                             thumbnail: await (await conn.getFile(thumb)).data 
                         } 
                     } 
                 } 
  
                 await conn.sendMessage(m.chat, doc, { 
                     quoted: m 
                 }) 
  
             } catch (e) { 
                 await m.reply("Error: " + e.message) 
             } 
         } 
     } 
  
 } 
 handler.help = ["mp4"].map(v => "yt" + v + ``) 
 handler.tags = ["youtube"] 
 handler.command = /^y(outube(mp4|vdl)|t((mp4|v)|vdl))$/i 
  
 handler.exp = 0 
 handler.register = false 
 handler.limit = 8
  
 export default handler 
  
 async function shortUrl(url) { 
     let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`) 
     return await res.text() 
 } 
  
 function formatDuration(seconds) { 
   const hours = Math.floor(seconds / 3600); 
   const minutes = Math.floor((seconds % 3600) / 60); 
   const remainingSeconds = seconds % 60; 
  
   const formattedDuration = []; 
  
   if (hours > 0) { 
     formattedDuration.push(`${hours} Jam`); 
   } 
  
   if (minutes > 0) { 
     formattedDuration.push(`${minutes} Menit`); 
   } 
  
   if (remainingSeconds > 0) { 
     formattedDuration.push(`${remainingSeconds} Detik`); 
   } 
  
   return formattedDuration.join(' '); 
 } 
  
  
 function formatBytes(bytes) { 
     if (bytes === 0) { 
         return '0 B'; 
     } 
     const sizes = ['B', 'KB', 'MB', 'GB', 'TB']; 
     const i = Math.floor(Math.log(bytes) / Math.log(1024)); 
     return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`; 
 } 
  
 async function ytmp4(query, quality = 134) { 
     try { 
         const videoInfo = await ytdl.getInfo(query, { 
             lang: 'id' 
         }); 
         const format = ytdl.chooseFormat(videoInfo.formats, { 
             format: quality, 
             filter: 'videoandaudio' 
         }) 
         let response = await fetch(format.url, { 
             method: 'HEAD' 
         }); 
         let contentLength = response.headers.get('content-length'); 
         let fileSizeInBytes = parseInt(contentLength); 
         return { 
             title: videoInfo.videoDetails.title, 
             thumb: videoInfo.videoDetails.thumbnails.slice(-1)[0], 
             date: videoInfo.videoDetails.publishDate, 
             duration: formatDuration(videoInfo.videoDetails.lengthSeconds), 
             channel: videoInfo.videoDetails.ownerChannelName, 
             quality: format.qualityLabel, 
             contentLength: formatBytes(fileSizeInBytes), 
             description: videoInfo.videoDetails.description, 
             videoUrl: format.url 
         } 
     } catch (error) { 
         throw error 
     } 
 }