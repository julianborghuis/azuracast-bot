const axios = require('axios')
const Discord = require("discord.js")

exports.run = (client, message, args, station) => {
  axios.get(`https://radiocmfm.eu/radio/8000/currentsong?sid=1`)
    .then(r => {
      const data = r.data;
      const embed = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setTitle(`Now playing on ${station.name}:`)
        .setDescription(`${data}`)
        .setFooter(`Made by CMFM!`)
        .setColor(3447003)
        .setImage(data.cover_medium)
      message.channel.send(embed)
    })
}

exports.info = {
  name: `nowplaying`,
  aliases: ['np'],
  description: `See what's now playing`,
  usage: `nowplaying *or* np`,
  station: true
}