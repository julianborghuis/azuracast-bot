const { MessageEmbed } = require("discord.js")

exports.run = (client, message, args) => {
    if(![client.config.ownerID].some(a => message.author.id == a))
        return message.channel.send(`You tried...`);

    const util = require('util');
    const exec = util.promisify(require('child_process').exec);
    
    async function ls() {
        const { stdout, stderr } = await exec(args.join(" "))
        .catch(e => {
            const embed = new MessageEmbed()
                .setColor("RED")
                .setTitle(`Command execution failed`)
                .setDescription(`\`\`\`xl\n${e}\`\`\``)
            message.channel.send(embed);
        })
        const embed = new MessageEmbed()
            .setColor(stderr ? "RED" : "GREEN")
            .setTitle(`Command execution ${stderr ? "failed" : "succeeded"}`)
            .setDescription(`\`\`\`xl\n${stderr ? stderr : stdout}\`\`\``)

        message.channel.send(embed);
    }
    ls();
}

exports.info = {
    name: `exec`,
    aliases: ['execute', 'cmd'],
    description: `Executes a command`,
    usage: `exec <command>`
}