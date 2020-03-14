const Discord = require('discord.js')

module.exports = async (client, guild) => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  const embed = new Discord.MessageEmbed()
  .setTitle(`🎉 I was added to a new server!`)
  .setColor('GREEN')
  .setDescription(`I was added to ${guild.name}`)
  .addField(`Guild ID`, guild.id)
  .addField(`User count`, guild.memberCount)
  .addField(`My server count`, client.guilds.cache.size)
  if(guild.iconURL) embed.setThumbnail(guild.iconURL);
  client.channels.resolve(client.config.statsChannel).send(embed)

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
