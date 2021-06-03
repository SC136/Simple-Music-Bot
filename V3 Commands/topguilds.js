const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'topguilds',
    run: async (client, message) => {
        if (message.author.id !== '594504468931018752') return message.channel.send('This Is A Owner Only Command. You Cannot Use This, Only The Owner Of The Bot Can!!! <:1099_chicken_nocie:793737126357368843>');
        const embed = new MessageEmbed()
        const guilds = client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .first(10);
        const description = guilds
            .map((guild, index) => {
                return `${index + 1}) ${guild.name}: ${guild.memberCount} members`;
            })
            .join("\n");
        message.channel.send(
            new MessageEmbed().setTitle(`<:SimpleMusicBot:797533617042882612> ${client.user.username}'s Top Servers`).setDescription(description).setColor('#2F3136').setTimestamp()
        )
    }
}