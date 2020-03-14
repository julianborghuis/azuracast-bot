const { MessageEmbed } = require("discord.js")

exports.run = async(client, message, args) => {
        const baseEmbed = new MessageEmbed()
            .setColor(client.config.embedColor)
            .setTitle(`Prefix`)

        if (!args[0]) {
            const settings = await client.getGuild(message.guild)
            const embed = baseEmbed
                .setDescription(`My prefixes are \`${settings.prefix.join(`\`, \``)}\`\n\nSet a new prefix with \`${settings.prefix[0]}prefix set\`\nAdd a prefix with \`${settings.prefix[0]}prefix add\``)

        message.channel.send(embed)
        return;
    }
    const filter = response => {
        return response.author.id === message.author.id
    };
    if (!message.member.hasPermission('MANAGE_MESSAGES') && message.author.id !== client.config.ownerID) {
        return;
    }
    
    switch (args[0]) {
        case 'set':
            message.channel.send(baseEmbed.setDescription(`Type my new prefix in chat!`)).then((m) => {
                message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                    .then(collected => {
                        const newPrefix = collected.first().content
                        try {
                            client.updateGuild(message.guild, { prefix: [newPrefix] })
                            m.edit(baseEmbed.setDescription(`My new prefix is \`${newPrefix}\``))
                        } catch (e) {

                        }
                    })
                    .catch(collected => {
                        m.edit(embed.setDescription(`Time ran out!`))
                    });
            });
            break;

        case 'add':
            message.channel.send(baseEmbed.setDescription(`Type a prefix to add in chat!`)).then((m) => {
                message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                    .then(async collected => {
                        const addPrefix = collected.first().content
                        const settings = await client.getGuild(message.guild)
                        const newPrefixes = settings.prefix
                        if(!newPrefixes.includes(addPrefix)){
                            newPrefixes.push(addPrefix) 
                        }
                        try {
                            client.updateGuild(message.guild, { prefix: newPrefixes })
                            m.edit(baseEmbed.setDescription(`My prefixes are now \`${newPrefixes.join("`, `")}\``))
                        } catch (e) {
                            console.error(e)
                        }
                    })
                    .catch(collected => {
                        m.edit(embed.setDescription(`Time ran out!`))
                    });
            });
            break;
        
        case 'remove':
            message.channel.send(baseEmbed.setDescription(`Type a prefix to remove!`)).then((m) => {
                message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                    .then(async collected => {
                        const settings = await client.getGuild(message.guild)
                        const newPrefixes = settings.prefix

                        const removePrefix = collected.first().content
                        const removeIndex = newPrefixes.indexOf(removePrefix);
                        if (removeIndex !== -1){
                            newPrefixes.splice(removeIndex, 1);
                        } else {
                            message.channel.send(`That is not a valid prefix!`)
                        }
                        try {
                            client.updateGuild(message.guild, { prefix: newPrefixes })
                            console.log(newPrefixes)
                            m.edit(baseEmbed.setDescription(`My prefixes are now \`${newPrefixes.join("`, `")}\``))
                        } catch (e) {
                            console.error(e)
                        }
                    })
                    .catch(collected => {
                        m.edit(embed.setDescription(`Time ran out!`))
                    });
            });
        break;
    }
}

exports.info = {
    name: `prefix`,
    aliases: ['prefixes'],
    description: `Set the prefix of this bot`,
    usage: `prefix <new prefix>`,
    station: false
}