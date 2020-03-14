const { MessageEmbed } = require("discord.js")

exports.run = async (client, message, args) => {
    const settings = await client.getGuild(message.guild)

    const embed = new MessageEmbed()
        .setAuthor("cmfm.nl", client.user.avatarURL, "https://cmfm.nl")
        .setColor(3447003)
        .setTitle(`Where to listen`)
        .setDescription(`
Listen on the [website](https://cmfm.nl)
Or type \`${settings.prefix[0]}play\`
`)

    message.channel.send(embed)
}

exports.info = {
    name: `listen`,
    aliases: ['where', 'website'],
    description: `Where to listen?`,
    usage: `listen`
  }