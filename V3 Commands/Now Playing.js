module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    run: (client, message) => {
        const error = client.error
        if (!message.member.voice.channel) return message.channel.send(error.setDescription(```You Need To Join A VC!```));

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(error.setDescription('```You Are Not In The Same VC As Me!```'));

        if (!client.player.getQueue(message)) return message.channel.send(error.setDescription('```There Is No Music Currently Playing!```'));

        const track = client.player.nowPlaying(message);
        const queue = client.player.getQueue(message);
        message.channel.send({
            embed: {
                color: '#2F3136',
                author: { name: 'Now Playing :' },
                title: { text: track.title },
                footer: { text: 'Simple Music Bot V3' },
                thumbnail: { url: track.thumbnail },
                timestamp: new Date(),
                fields: [
                    { name: 'Channel :', value: `\`\`\`${track.author}\`\`\``, inline: true },
                    { name: 'Requested By :', value: `\`\`\`${track.requestedBy.username}\`\`\``, inline: true },
                    { name: 'Playlist :', value: `\`\`\`${track.fromPlaylist ? 'Yes' : 'No'}\`\`\``, inline: true },
                    { name: 'Views :', value: `\`\`\`${track.views}\`\`\``, inline: true },
                    { name: 'Duration :', value: `\`\`\`${track.duration}\`\`\``, inline: true },
                    { name: 'Song Link :', value: `[URL](${track.url})`, inline: true },
                    { name: 'Source :', value: `\`\`\`${track.source}\`\`\``, inline: true },
                    { name: 'Volume :', value: `\`\`\`${queue.volume}\`\`\``, inline: true },
                    { name: 'Repeat Mode :', value: `\`\`\`${queue.repeatMode ? 'Yes' : 'No'}\`\`\``, inline: true },
                    { name: 'Currently Paused :', value: `\`\`\`${queue.paused ? 'Yes' : 'No'}\`\`\``, inline: true },
                    { name: 'Progress Bar :', value: `\`\`\`${client.player.createProgressBar(message, { timecodes: true })}\`\`\``, inline: false }
                ],
            },
        });
    },
};