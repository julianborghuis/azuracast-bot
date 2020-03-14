const { MessageEmbed } = require("discord.js")

exports.run = async(client, message, args) => {
    if (args[0] == "set") {
        args.splice(0, 1)
        const newStation = client.findStation(args.join(" "))
        if (newStation) {
            await client.setGuildStation(message.guild, newStation.name)
            const embed = new MessageEmbed()
                .setColor("GREEN")
                .setTitle("New station set!")
                .setDescription(`Default station is now ${newStation.name}!`)

            message.channel.send(embed)
        } else {
            message.channel.send(new MessageEmbed()
                .setColor("RED")
                .setTitle("Station not found!")
            )
        }
    } else {
        const settings = message.settings
        const map = client.stations.map((a, i) => {
            if (a.name == message.settings.station) {
                return `✅  **${i+1}**. **${a.name}**: ${a.description}`
            } else {
                return `**${i+1}**. **${a.name}**: ${a.description}`
            }
        })
        const embed = new MessageEmbed()
            .setTitle("CMFM! stations")
            .setColor(3447003)
            .setDescription(`${map.join('\n')}\n\n🔊 Play a station with \`${settings.prefix[0]}play [name]\`\n✅ Means currently selected station.\nSet a station with \`${settings.prefix[0]}station set <name>\``)

        message.channel.send(embed)
    }
}

exports.info = {
    name: `stations`,
    aliases: ['station'],
    description: `Displays all stations`,
    usage: ``,
    station: false
}