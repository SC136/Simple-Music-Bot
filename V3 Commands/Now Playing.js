module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    run: (client, message) => {
        const error = client.error
        if (!message.member.voice.channel) return message.channel.send(error.setDescription(```You Need To Join A VC!```));

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(error.setDescription('```You Are Not In The Same VC As Me!```'));

        if (!client.player.getQueue(message)) return message.channel.send(error.setDescription('```There Is No Music Currently Playing!```'));

        const track = client.player.nowPlaying(message);

        message.channel.send({
            embed: {
                color: '#2F3136',
                author: { name: track.title },
                footer: { text: 'Simple Music Bot V3' },
                fields: [
                    { name: 'Channel :', value: track.author, inline: true },
                    { name: 'Requested By :', value: track.requestedBy.username, inline: true },
                    { name: 'Playlist :', value: track.fromPlaylist ? 'Yes' : 'No', inline: true },

                    { name: 'Views :', value: track.views, inline: true },
                    { name: 'Duration :', value: track.duration, inline: true },
                    { name: 'Song Link :', value: track.url, inline: true },
                    { name: 'Source :', value: track.source, inline: true },

                    { name: 'Volume :', value: client.player.getQueue(message).volume, inline: true },
                    { name: 'Repeat Mode :', value: client.player.getQueue(message).repeatMode ? 'Yes' : 'No', inline: true },
                    { name: 'Currently Paused :', value: client.player.getQueue(message).paused ? 'Yes' : 'No', inline: true },

                    { name: 'Progress Bar :', value: client.player.createProgressBar(message, { timecodes: true }), inline: false }
                ],
                thumbnail: { url: track.thumbnail },
                timestamp: new Date(),
            },
        });
    },
};