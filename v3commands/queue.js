const { MessageEmbed } = require(`discord.js`);
module.exports = {
    name: 'queue',
    description: 'Shows The Queue!',
    run: (client, message) => {
        let queue = client.player.getQueue(message.guild.id);
        if (!message.member.voice.channelId) return client.error(message, `You Need To Join A VC!`);
        if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return client.error(message, `You Are Not In The Same VC As Me!`);
        if (!queue) return client.error(message, `There Is No Music Playing In This Server!`);
        if (!queue.current) return client.error(message, `There Is No Music Playing In This Server!`);
        const embed = new MessageEmbed()
        .setAuthor(`Music Queue For :`)
        .setTitle(message.guild.name)
        .setDescription((queue.tracks.map((track, i) => {
                    return `**\`${i + 1}\`** : [${track.title} | ${track.author}](${track.url}) (Requested By : ${track.requestedBy.username})`
                }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `And **${queue.tracks.length - 5}** Other Song(s)...` : `In The Playlist : **${queue.tracks.length}** Song(s)...`}`))
        .addField(`Current Song :`, `\`\`\`${queue.current.title} : ${queue.current.author}\`\`\``)
        .setColor(`#2F3136`);
        message.reply({ embeds: [embed] });
    },
};