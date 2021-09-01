const { MessageEmbed } = require('discord.js');
const { inspect } = require('util');
module.exports = {
    name: 'eval',
    description: 'Eval The Given Code!',
    run: async (client, message, args) => {
        if (message.author.id !== '594504468931018752') return client.error(message, `Only The Developer Of Simple Music Bot Can Use This Command!`);
        const command = args.join(" ");
        if (!command) return client.error(message, `You Need To Enter Something For Simple Music Bot To Eval It!`)
        let queue = client.player.getQueue(message.guild.id);
        try {
            const evaled = eval(command)
            var embed = new MessageEmbed()
                .setTitle('Evaluated')
                .addFields(
                    { name: 'To Eval', value: `\`\`\`${command.length > 1024 ? 'Too Large To Display' : command}\`\`\`` },
                    { name: 'Evaled', value: `\`\`\`JS\n${inspect(evaled, { depth: 0 }).length > 1024 ? `Too Large To Display` : inspect(evaled, { depth: 0 })}\`\`\`` },
                    { name: 'Type', value: `\`\`\`${typeof (evaled)}\`\`\`` }
                )
                .setColor('#2F3136')
            message.reply({ embeds: [embed] });
        } catch (error) {
            var embed = new MessageEmbed()
                .addFields(
                    { name: 'Error :', value: `\`\`\`JS\n${error}\`\`\`` }
                )
                .setColor('#2F3136')
            message.reply({ embeds: [embed] });
        };
    },
};