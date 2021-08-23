const { MessageEmbed } = require(`discord.js`);
module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    run: (client, message) => {
        let queue = client.player.getQueue(message.guild.id);
        if (!message.member.voice.channelId) return client.error(message, `You Need To Join A VC!`);
        if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return client.error(message, `You Are Not In The Same VC As Me!`);
        if (!queue) return client.error(message, `There Is No Music Playing In This Server!`);
        const track = queue.current;
        const embed = new MessageEmbed()
        .setAuthor(`Now Playing :`)
        .setTitle(track.title)
        .setThumbnail(track.thumbnail)
        .addField(`Channel :`, `\`\`\`${track.author}\`\`\``, true)
        .addField(`Requested By :`, `\`\`\`${track.requestedBy.tag}\`\`\``, true)
        .addField(`From A Playlist :`, `\`\`\`${track.fromPlaylist ? 'Yes' : 'No'}\`\`\``, true)
        .addField(`Views :`, `\`\`\`${track.views}\`\`\``, true)
        .addField(`Duration :`, `\`\`\`${track.duration}\`\`\``, true)
        .addField(`Song Link :`, `[URL](${track.url})`, true)
        .addField(`Source :`, `\`\`\`${track.source}\`\`\``, true)
        .addField(`Volume :`, `\`\`\`${queue.volume}\`\`\``, true)
        .addField(`Repeat Mode :`, `\`\`\`${queue.repeatMode ? 'Yes' : 'No'}\`\`\``, true)
        .addField(`Currently Paused :`, `\`\`\`${queue.paused ? 'Yes' : 'No'}\`\`\``, true)
        .addField(`Progress Bar :`, `\`\`\`${queue.createProgressBar({ timecodes: true })}\`\`\``, false)
        .setColor(`#2F3136`);
        message.reply({ embeds: [embed] });
    },
};