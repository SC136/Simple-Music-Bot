const { MessageEmbed } = require('discord.js');
const { mem, cpu, os } = require('node-os-utils');
const moment = require('moment');
module.exports = {
    name: 'botinfo',
    run: async (message, args, client) => {
        const d = moment.duration(client.uptime);
        const days = (d.days() == 1) ? `${d.days()} Day` : `${d.days()} Days`;
        const hours = (d.hours() == 1) ? `${d.hours()} Hour` : `${d.hours()} Hours`;
        const minutes = (d.minutes() == 1) ? `${d.minutes()} Minute` : `${d.minutes()} Minutes`;
        const seconds = (d.seconds() == 1) ? `${d.seconds()} Second` : `${d.seconds()} Seconds`;
        const date = moment().subtract(d, 'ms').format('dddd, MMMM Do YYYY');
        const { totalMemMb, usedMemMb } = await mem.info();
        let member = message.guild.me
        const embed = new MessageEmbed()
            .setTitle('<:SimpleMusicBot:797533617042882612> Simple Music Bot\'s Info/Stats')
            //.setThumbnail(`${bot.user.displayAvatarURL()}`)
            .setDescription('BotInfo Nothing More')
            .addField('Name :', `\`\`\`${client.user.username}\`\`\``, true)
            .addField('ID :', `\`\`\`${client.user.id}\`\`\``, true)
            .addField('Servers :', `\`\`\`${client.guilds.cache.size}\`\`\``, true)
            .addField('Users :', `\`\`\`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\`\`\``, true)
            .addField('Channels :', `\`\`\`${client.channels.cache.size}\`\`\``, true)
            .addField('Emojis :', `\`\`\`${client.emojis.cache.size}\`\`\``, true)
            .addField('Created At :', `\`\`\`${moment.utc(client.user.createdAt).format("dddd, MMMM Do YYYY")}\`\`\``, true)
            .addField('Joined This Server At :', `\`\`\`${moment.utc(client.user.joinedAt).format("dddd, MMMM Do YYYY")}\`\`\``, true)
            .addField('Status :', `\`\`\`${client.user.presence.status}\`\`\``, true)
            .addField('FrameWork :', '```Discord.js```', true)
            .addField('Discord.js Version :', '```12.5.0```', true)
            .addField('Owner :', '```SC#0600```')
            .addField('Support Server Invite Link :', '```https://discord.gg/Qysc2PXp5e```')
            .addField('Uptime :', `\`\`\`${days}, ${hours}, ${minutes}, And ${seconds}\`\`\``)
            .addField('Stats', `\`\`\`Total Memory (RAM)    : ${totalMemMb} MB \nUsed Memory (RAM)     : ${usedMemMb} MB \nCPU Usage             : ${await cpu.usage()} \nCPU Model             : ${cpu.model()} \nCPU Cores             : ${cpu.count()} \nOS (Operating System) : ${await os.oos()}\`\`\``)
            .addField('Roles :', `${member.roles.cache.map(r => `<@&${r.id}>`).join(' • ')}`)
            .addField('Last Updated :', `\`\`\`${date}\`\`\``)
            .setColor("#2F3136")
            .setTimestamp()
        message.channel.send(embed)
    }
}