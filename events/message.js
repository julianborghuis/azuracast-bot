module.exports = async(client, message) => {
    // Ignore all bots
    if (message.author.bot) return;

    if (message.channel.type === 'dm') {
        return message.channel.send("Please join a server to use me \nJoin the CMFM! Discord server here: https://discord.io/CMFM");
    }

    // Ignore messages not starting with the prefix
    const settings = await client.getGuild(message.guild)

    if (!settings) {
        const newGuild = {
            guildID: guild.id,
            guildName: guild.name,
            ownerID: guild.ownerID
        };

        try {
            await client.createGuild(newGuild);
        } catch (error) {
            console.error(error);
        }
    }

    message.settings = settings || client.config.defaultSettings
    if (message.mentions.users.first()) {
        if (message.mentions.users.first().id === client.user.id) {
            const prefixCmd = client.commands.get("prefix")
            return await prefixCmd.run(client, message, [])
        }
    }

    const prefixes = settings.prefix
    let prefix = false;
    for (const thisPrefix of prefixes) {
        if (message.content.toLowerCase().startsWith(thisPrefix)) prefix = thisPrefix;
    }

    // Ignore messages not starting with the prefix
    if (message.content.toLowerCase().indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);
    const alias = client.commandAliases.get(command)

    const messageStation = async() => {
        const stationCheck = await client.getGuildStation(message.guild)
        return args[0] ? client.findStation(args.join(' ')) : stationCheck
    }
    if (cmd) {
        if (cmd.info.station) {
            message.station = await messageStation()
            if (!message.station) {
                return message.reply("No station found!");
            }
        }
    } else if (alias) {
        if (alias.info.station) {
            message.station = await messageStation()
            if (!message.station) {
                return message.reply("No station found!");
            }
        }
    }

    if (cmd) {
        try {
            if (!cmd.info.station) {
                cmd.run(client, message, args);
            } else {
                cmd.run(client, message, args, message.station);

            }
        } catch (e) {
            console.log(e)
        }
    } else if (alias) {
        try {
            if (!alias.info.station) {
                alias.run(client, message, args);
            } else {
                alias.run(client, message, args, message.station);

            }
        } catch (e) {
            console.log(e)
        }
    }
};