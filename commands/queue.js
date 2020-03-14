const { MessageEmbed } = require("discord.js")
const axios = require("axios").default
const moment = require('moment')

exports.run = (client, message, args, station) => {
    const data = client.apiData[station.id]
    const nowplaying = data.now_playing
    const nextSong = `${data.playing_next.song.text} ${data.playing_next.is_request ? "**[Requested]**" : ""}`
    const songHistory = data.song_history.map((a, i) => {
        return `**${moment(a.played_at*1000).fromNow()}**. ${a.song.text} ${a.is_request ? "**[Requested]**" : ""}`;
    })

    const embed = new MessageEmbed()
        .setTitle(`Queue for ${station.name}`)
        .setColor(3447003)
        .setThumbnail(data.now_playing.song.art)
        .setDescription(`
⏩ **Playing next:**
${nextSong}

🔊 **Now playing:**
${nowplaying.song.text} [${client.convertLength(nowplaying.elapsed * 1000)} / ${client.convertLength(nowplaying.duration * 1000)}] ${nowplaying.is_request ? "**[Requested]**" : ""}

⏪ **Previously played:**
${songHistory.join("\n")}
`)

    message.channel.send(embed)
}

exports.info = {
    name: `queue`,
    aliases: ['q', 'next', 'history', 'previous'],
    description: `Displays the queue`,
    usage: `queue`,
    station: true
}