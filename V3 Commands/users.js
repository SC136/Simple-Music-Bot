const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'users',
    run: async (client, message) => {
        const embed = new MessageEmbed()
            .setTitle('<:SimpleMusicBot:797533617042882612> Simple Music Bot')
            .setDescription('The Total Number Of \nUsers That Are In The \nServers That The Bot Is In')
            .setThumbnail(`${client.user.displayAvatarURL()}`)
            .addField('Total Users :', `\`\`\`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\`\`\``)
            .setColor("#2F3136")
            .setTimestamp()
        message.channel.send(embed)
    }
}