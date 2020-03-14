const axios = require("axios").default
const Discord = require("discord.js")

exports.run = (client, message, args) => {
    if(!args[0]){
      message.reply("you need to mention something to request!");
      return;
    }
    
    const request = args.join(" ")

    const m = message.channel.send(new Discord.MessageEmbed()
      .setDescription(`Searching for \`${request}\``)
    )
    axios.get("https://radiocmfm.eu/api/station/1/requests")
      .then(r => {
        const queryData = r.data.find(e => e.song.text.toLowerCase().includes(request.toLowerCase()))
        if(!queryData){
          m.then(m => {
            m.edit(new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle("No songs found!")
            )
          })
          return;
        }
        m.then(m => {
          m.edit(new Discord.MessageEmbed()
            .setTitle("Song found!")
            .setColor("GREEN")
            .setDescription(`Requesting \`${queryData.song.text}\`...`)
            .setThumbnail(queryData.song.art)
          )
        })
        axios.get(`https://radiocmfm.eu/api/station/1/request/${queryData.request_id}`, { headers: { '5f1c2d94b970e469': client.config.azuracast } })
        .then(r => {
          m.then(m => {
            m.edit(new Discord.MessageEmbed()
              .setTitle(`Request \`${queryData.song.text}\``)
              .setDescription(r.data.message)
              .setColor("GREEN")
              .setThumbnail(queryData.song.art)
            )
          })
        }).catch(e => {
          console.log(e.response)
          m.then(m => {
            m.edit(new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle(`Request \`${queryData.song.text}\``)
              .setDescription(e.response.data.message)
              .setThumbnail(queryData.song.art)
            )
          })
        })
      })
}
exports.info = {
  name: `request`,
  aliases: ['r'],
  description: `Request a song.`,
  usage: `request <song title>`
}