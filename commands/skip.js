const { MessageEmbed } = require("discord.js")

exports.run = (client, message, args, station) => {
    // not ready yet
    return;
    if (client.voteSkip[station.id].set.has(message.author.id)) {
        const embed = new MessageEmbed()
            .setTitle("You have already voted to skip!")
            .setColor("RED")

        message.channel.send(embed)
    } else {
        client.addVoteSkip(4, message.author.id).then(status => {
            if (status === "skipped") {
                const embed = new MessageEmbed()
                    .setTitle("Song skipped!")
                    .setColor("GREEN")

                message.channel.send(embed)
            } else {
                const embed = new MessageEmbed()
                    .setTitle("Voteskip added!")
                    .setColor("GREEN")

                message.channel.send(embed)
            }
        })

    }
}

exports.info = {
    name: `skip`,
    aliases: ['voteskip'],
    description: `Vote to skip!`,
    usage: `skip [station]`,
    station: true
}