module.exports = async(client, oldState, newState) => {
    if (newState.channel) {
        if (client.voice.connections.get(newState.guild.id)) {
            return
        }

        try {
            const guild = await client.getGuild(newState.guild)
            if (guild && guild.autoJoinChannel) {
                const fetchedGuild = client.guilds.resolve(guild.guildID)
                const channel = fetchedGuild.channels.resolve(guild.autoJoinChannel)
                if (channel.members.filter(member => !member.user.bot).size >= 1) {
                    const station = await client.getGuildStation(fetchedGuild)
                    client.getBroadcast(station).then(async broadcast => {
                        const connection = await channel.join()
                        connection.play(broadcast.broadcast)
                    })
                }
            }
        } catch (e) {
            console.error(e)
        }
    }

    if (oldState.channel) {
        if (oldState.channel.members.filter(member => !member.user.bot).size === 0) {
            try {
                oldState.channel.leave()
            } catch (e) {}
        }
    }
}