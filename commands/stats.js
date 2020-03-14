const { MessageEmbed } = require("discord.js")

exports.run = async(client, message, args) => {

    const servers = client.guilds.cache.size
    const members = client.users.cache.size
    const channels = client.channels.cache.size
    const playingPlayers = client.voice.connections.size

    const embed = new MessageEmbed()
        .setColor(client.config.embedColor)
        .setTitle("My stats")
        .setThumbnail(client.user.avatarURL())
        .addField("Total members", members, true)
        .addField("Total channels", channels, true)
        .addField("Server count", servers, true)
        .addField("Playing players", playingPlayers, true)

    message.channel.send(embed)
}

exports.info = {
    name: `stats`,
    aliases: ['info'],
    description: `shows stats`,
    usage: ``
}