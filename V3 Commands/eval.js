const { MessageEmbed } = require('discord.js');
const { inspect } = require('util');
module.exports = {
    name: 'eval',
    run: async (client, message, args) => {
        if (message.author.id !== '594504468931018752') return message.channel.send('This is an owner only command. You cannot use this, sadly.');
        const command = args.join(" ");
        if (!command) return message.channel.send('You need to enter something for me to eval it!');
        try {
            const evaled = eval(command)

            var embed = new MessageEmbed()
                .setColor(client.color)
                .setTitle('Evaluated')
                .addFields(
                    { name: 'To Eval', value: `\`\`\`${command}\`\`\`` },
                    { name: 'Evaled', value: `\`\`\`JS\n${inspect(evaled, { depth: 0 })}\`\`\`` },
                    { name: 'Type', value: `\`\`\`${typeof (evaled)}\`\`\`` }
                )
                .setTimestamp()
            message.channel.send(embed);
        } catch (error) {
            var embed = new MessageEmbed()
                .setColor(client.color)
                .setTitle('Error')
                .addFields(
                    { name: 'Error', value: `${error}` }
                )
                .setTimestamp()
            message.channel.send(embed);
        }
    }
}