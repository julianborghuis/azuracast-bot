const { MessageEmbed } = require("discord.js")
const axios = require("axios")

exports.run = async(client, message, args, station) => {
    // Only try to join the sender's voice channel if they are in one themselves
    if (client.voice.connections.get(message.guild.id)) {
        message.reply(`I'm already playing in \`${client.voice.connections.get(message.guild.id).channel.name}\``)
    } else if (message.member.voice.channel) {
        client.getBroadcast(station)
            .then(async(broadcast) => {
                axios.get(`https://radiocmfm.eu/radio/8000/currentsong?sid=1`)
                    .then(({ data }) => {
                        const embed = new MessageEmbed()
                            .setColor(3447003)
                            .setAuthor(message.member.voice.channel.name)
                            .setTitle(`🔊 Now playing:`)
                            .setDescription(`🎵 **${data}**
📢 **Station**: ${broadcast.station.name}
`)
                            .setThumbnail()
                            .setFooter(data)
                        message.channel.send(embed)
                    })
                const connection = await message.member.voice.channel.join()
                connection.play(broadcast.broadcast)
            })
            .catch(e => {
                console.log(e)
                message.reply(`No station found with the name \`${args.join(' ')}\``)
            })

    } else {
        message.reply('You need to join a voice channel first!');
    }
}

exports.info = {
    name: `play`,
    aliases: ['p'],
    description: `Play CMFM! in the users current voice channel.`,
    usage: `play *or* p`,
    station: true
}