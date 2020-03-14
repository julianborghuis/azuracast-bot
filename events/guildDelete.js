module.exports = async (client, guild) => {
    try {
        await client.deleteGuild(guild)
    } catch(err) {
        console.error(err)
    }
}