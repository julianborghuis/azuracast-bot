const { MessageEmbed } = require("discord.js")

exports.run = async (client, message, args) => {
    const settings = await client.getGuild(message.guild)

    const embed  = new MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setTitle("Commands")
        .setColor(3447003)
        .setDescription(`
\`autojoin\`: Enables or disables the autojoin feature.
\`play [station]\`: Plays CMFM! in the users current channel.
\`stop\` or \`leave\`: Stops playing.
\`songs\`: Displays all available songs.
\`queue [station]\`: Displays the queue
\`help\`: Displays this.
\`nowplaying [station]\`: Displays the current playing track.
\`request\` or \`r\`: Request a song.
\`lyrics [station]\`: Displays the lyrics of the current song.
\`prefix [add/set/remove]\`: Add, set or remove the prefix of this bot.

Remember to use one of these prefixes:  \`${settings.prefix.join("`, `")}\`
You can see all stations with \`${settings.prefix[0]}stations\`.
`)
    message.channel.send(embed)
}

exports.info = {
    name: `help`,
    aliases: ['h'],
    description: `Help command`,
    usage: `help`
}