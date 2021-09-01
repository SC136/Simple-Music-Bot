const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'invite',
    run: async (client, message) => {
        const embed = new MessageEmbed()
            .setTitle(`${client.emoji} Simple Music Bot Invite Link :`)
            .setDescription('[Click Here To Invite Simple Music Bot](https://discord.com/api/oauth2/authorize?client_id=780838708664467456&permissions=3147776&scope=bot)')
            .setThumbnail(`${client.user.avatarURL({ format: `png`, size: 4096 })}`)
            .setColor("#2F3136");
        message.channel.send({ embeds: [embed] });
    },
};