const Discord = require('discord.js');

function clean(text) { // For Eval
        if (typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }
exports.run = async (client, message, args) => {
  if(![client.config.ownerID].some(a => message.author.id == a))
          return message.channel.send(`You tried...`);
  try {
        const code = args.join(' ');
        let evaled = (args[0] === "async") ? args.shift() && await eval(args.join(" ")) : eval(code)
        if(typeof evaled !== 'string')
            evaled = require('util').inspect(evaled);

        const embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Evaluation: Success')
            .setDescription(`\`\`\`xl\n${clean(evaled)}\n\`\`\``)
        message.channel.send(embed).catch(err => {
            const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Evaluation: Error')
            .setDescription(`\`\`\`xl\n${clean(err)}\n\`\`\``)
        message.channel.send(embed);   
        })
    } catch (err) {
        const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Evaluation: Error')
            .setDescription(`\`\`\`xl\n${clean(err)}\n\`\`\``)
        message.channel.send(embed);
    }
}
exports.info = {
    name: `eval`,
    aliases: [],
    description: `Evaluate code!`,
    usage: `eval <code to eval>`,
}