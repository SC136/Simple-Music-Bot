const { MessageEmbed } = require('discord.js');
const moment = require('moment');
module.exports = {
    name: 'uptime',
    aliases: [`up`],
    description: `Shows The Uptime Of Simple Music Bot!`,
    run: async (client, message) => {
        const d = moment.duration(client.uptime);
        const days = (d.days() == 1) ? `${d.days()} Day` : `${d.days()} Days`;
        const hours = (d.hours() == 1) ? `${d.hours()} Hour` : `${d.hours()} Hours`;
        const minutes = (d.minutes() == 1) ? `${d.minutes()} Minute` : `${d.minutes()} Minutes`;
        const seconds = (d.seconds() == 1) ? `${d.seconds()} Second` : `${d.seconds()} Seconds`;
        const date = moment().subtract(d, 'ms').format('dddd, MMMM Do YYYY');
        const embed = new MessageEmbed()
            .setDescription(`**<:SimpleMusicBot:797533617042882612> Simple Music Bot Uptime :**\`\`\`prolog\n${days}, ${hours}, ${minutes}, And ${seconds}\`\`\`\n**📅 Date Launched :**\`\`\`prolog\n${date}\`\`\``)
            .setColor("#2F3136");
            // .setColor(msg.guild.me.displayHexColor);
        message.reply({ embeds: [embed] })
    },
};