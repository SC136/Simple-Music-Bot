const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'servers',
    run: async (client, message) => {
        const embed = new MessageEmbed()
            .setTitle(`${client.emoji} Simple Music Bot`)
            .setDescription('The Total Number Of \nDiscord Servers That The \nBot Is In')
            .setThumbnail(`${client.user.displayAvatarURL({ format: `png`, size: 4096 })}`)
            .addField('Total Servers :', `\`\`\`${client.guilds.cache.size}\`\`\``)
            .setColor("#2F3136");
        message.channel.send({ embeds: [embed] });
    },
};