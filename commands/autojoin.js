const { MessageEmbed } = require("discord.js")

exports.run = async(client, message, args) => {
    const settings = await client.getGuild(message.guild)

    if (!args[0]) {
        const autoJoinChannelCheck = client.channels.resolve(settings.autoJoinChannel)
        const autoJoinChannel = autoJoinChannelCheck ? autoJoinChannelCheck : "Not Set"
        return message.channel.send(new MessageEmbed()
            .setTitle("AutoJoin command")
            .setColor(client.config.embedColor)
            .setDescription(`**Current channel**: ${autoJoinChannel} \n\nTo make CMFM! automatically join the voice channel, simply join the voice channel you want to link me to and type \`${settings.prefix[0]}autojoin enable\``)
            .addField(`Permissions required`, "`MANAGE_CHANNELS`")
        );
    }
    if (args[0] === "enable") {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
            return message.channel.send(new MessageEmbed()
                .setColor("RED")
                .setDescription("You need the `MANAGE_CHANNELS` permission to do this!")
            )
        }
        if (message.member.voice.channel) {
            try {
                client.updateGuild(message.guild, { autoJoinChannel: message.member.voice.channel.id });
            } catch (e) {
                return message.channel.send(new MessageEmbed()
                    .setColor("RED")
                    .setDescription("An error ocurred!")
                )
            }
            message.channel.send(new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`I will now automatically join \`${message.member.voice.channel.name}\` when someone joins!`)
            )
        } else {
            return message.channel.send(new MessageEmbed()
                .setColor("RED")
                .setTitle("You need to join a voice channel first!")
            )
        }
    } else if (args[0] == "disable") {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
            return message.channel.send(new MessageEmbed()
                .setColor("RED")
                .setDescription("You need the `MANAGE_CHANNELS` permission to do this!")
            )
        }
        try {
            client.updateGuild(message.guild, { autoJoinChannel: message.member.voice.channel.id });
        } catch (e) {
            return message.channel.send(new MessageEmbed()
                .setColor("RED")
                .setDescription("An error ocurred!")
            )
        }
        message.channel.send(new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`I will not automatically join \`${message.member.voice.channel.name}\` anymore!`)
        )
    }
}

exports.info = {
    name: `autojoin`,
    aliases: [],
    description: `Enables or disables autojoining of a voice channel`,
    usage: `autojoin <enable or disable>`
}