const { MessageEmbed } = require('discord.js');
const moment = require('moment');
module.exports = {
    name: 'uptime',
    run: async (message, args, client) => {
        const d = moment.duration(msg.client.uptime);
        const days = (d.days() == 1) ? `${d.days()} Day` : `${d.days()} Days`;
        const hours = (d.hours() == 1) ? `${d.hours()} Hour` : `${d.hours()} Hours`;
        const minutes = (d.minutes() == 1) ? `${d.minutes()} Minute` : `${d.minutes()} Minutes`;
        const seconds = (d.seconds() == 1) ? `${d.seconds()} Second` : `${d.seconds()} Seconds`;
        const date = moment().subtract(d, 'ms').format('dddd, MMMM Do YYYY');
        const embed = new MessageEmbed()
            .setTitle('<:SimpleMusicBot:797533617042882612> Simple Music Bot Uptime :')
            .setDescription(`\`\`\`prolog\n${days}, ${hours}, ${minutes}, And ${seconds}\`\`\``)
            .addField('Date Launched :', date)
            .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor("#2F3136")
        //.setColor(msg.guild.me.displayHexColor);
        message.channel.send(embed)
    }
}