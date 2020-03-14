const { MessageEmbed } = require("discord.js")

exports.run = (client, message, args) => {
    const embed = new MessageEmbed()
    .setTitle("Ping")
    .setColor(client.config.embedColor)
    .setDescription(`
**Latency**: measuring...
`)
    message.channel.send(embed).then(m =>{
        m.edit(embed.setDescription(`
**Latency**: ${m.createdTimestamp - message.createdTimestamp}ms
`))
    })
}
exports.info = {
  name: `ping`,
  aliases: [],
  description: `Shows the ping of the bot`,
  usage: `ping`
}