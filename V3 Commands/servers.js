const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'servers',
    run: async (client, message) => {
        const embed = new MessageEmbed()
            .setTitle('<:SimpleMusicBot:797533617042882612> Simple Music Bot')
            .setDescription('The Total Number Of \nDiscord Servers That The \nBot Is In')
            .setThumbnail(`${client.user.displayAvatarURL()}`)
            .addField('Total Servers :', `\`\`\`${client.guilds.cache.size}\`\`\``)
            .setColor("#2F3136")
            .setTimestamp()
        message.channel.send(embed)
    }
}