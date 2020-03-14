var axios = require("axios")
const Discord = require('discord.js');

exports.run = (client, message, args, station) => {

    const m = message.channel.send(new Discord.MessageEmbed()
        .setColor(3447003)
        .setTitle("One moment...")
    )

    sendLyrics(client.getApiData(station).now_playing.song.text, m)

      function sendLyrics(q, m){
        axios.get('https://api.ksoft.si/lyrics/search?q='+q, {headers: {'Authorization': 'Bearer '+client.config.ksoft}})
        .then(res => {
            m.then(m => {
                m.delete()
            })
            var lyrics = res.data.data[0].lyrics
            var song = res.data.data[0].artist + ' - ' + res.data.data[0].name
            var firstLyricPart = lyrics.substring(0, Math.min(lyrics.length, 0 + 1990));
            var lastArrayElement = lyrics.slice(firstLyricPart.length).trim() 
            var requestedBy = message.author.tag
            //console.log(lastArrayElement)
            for(let i = 0; i < lyrics.length; i += 1990) {
              const toSend = lyrics.substring(i, Math.min(lyrics.length, i + 1990));
              //sendIt(toSend);
                  if(toSend == firstLyricPart && lastArrayElement.length < 1){
                      sendIt(toSend, true, true)
                  } else if (toSend == firstLyricPart) {
                      sendIt(toSend, true)
                  } else if (toSend == lastArrayElement){
                      sendIt(toSend, false, true)
                  } else {
                      sendIt(toSend, false, false)
                  }
              }
            function sendIt(msg, first, last){
              if(first && last){
                var embed = new Discord.MessageEmbed()
                .setAuthor(song)
                .setColor('BLUE')
                .setDescription(msg)
                .setFooter(`Requested by ${requestedBy} | Lyrics provided by KSoft`, message.author.avatarURL);
                message.channel.send(embed) 
              }else if(first){
                  var embed = new Discord.MessageEmbed()
                  .setAuthor(song)
                  .setColor('BLUE')
                  .setDescription(msg);
                  message.channel.send(embed) 
              } else if (last){
                  var embed = new Discord.MessageEmbed()
                  .setDescription(msg)
                  .setColor('BLUE')
                  .setFooter(`Requested by ${requestedBy} | Lyrics provided by KSoft.Si`, message.author.avatarURL);
                  message.channel.send(embed) 
                  return;
              } else if (!first && !last) {
                  var embed = new Discord.MessageEmbed()
                  .setDescription(msg)
                  .setColor('BLUE');
                  message.channel.send(embed)
              }
            }
        })
        .catch((error) => {
            m.then(m => {
                m.delete()
            })
            // handle error
            console.log(`oof`);
            var embed = new Discord.MessageEmbed()
                .setTitle(`❌ Error`)
                .setColor(`RED`)
                .setDescription(`Couldn't find lyrics for ${q}`)
            return message.channel.send(embed);
          })
      }
}

exports.info = {
    name: `lyrics`,
    aliases: ['l'],
    description: `Get the lyrics of the current song.`,
    usage: `lyrics *or* l`,
    station: true
}