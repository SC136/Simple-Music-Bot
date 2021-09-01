const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'users',
    run: async (client, message) => {
        const embed = new MessageEmbed()
            .setTitle(`${client.emoji} Simple Music Bot`)
            .setDescription('The Total Number Of \nUsers That Are In The \nServers That The Bot Is In')
            .setThumbnail(`${client.user.displayAvatarURL({ format: `png`, size: 4096 })}`)
            .addField('Total Users :', `\`\`\`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\`\`\``)
            .setColor("#2F3136");
        message.channel.send({ embeds: [embed] });
    },
};