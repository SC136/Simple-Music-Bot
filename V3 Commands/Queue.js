module.exports = {
    name: 'queue',
    run: (client, message) => {
        const error = client.error;
        if (!message.member.voice.channel) return message.channel.send(error.setDescription('```You Need To Join A VC!```'));

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(error.setDescription('```You Are Not In The Same VC As Me!```'));

        const queue = client.player.getQueue(message);

        if (!client.player.getQueue(message)) return message.channel.send(error.setDescription('```There Are No Songs Currently Playing!```'));

        // message.channel.send(`**Server queue - ${message.guild.name} ${client.player.getQueue(message).loopMode ? '(looped)' : ''}**\nCurrent : ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track, i) => {
        //     return `**#${i + 1}** - ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})`
        // }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `And **${queue.tracks.length - 5}** other songs...` : `In the playlist **${queue.tracks.length}** song(s)...`}`));

        message.channel.send({
            embed: {
                color: '#2F3136',
                author: { name: 'Music Queue For :' },
                title: message.guild.name,
                fields: [
                    { name: 'Current Song :', value: `\`\`\`${queue.playing.title} : ${queue.playing.author}\`\`\`` }
                ],
                description: (queue.tracks.map((track, i) => {
                    return `**\`${i + 1}\`** : [${track.title} | ${track.author}](${track.url}) (Requested By : ${track.requestedBy.username})`
                }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `And **${queue.tracks.length - 5}** Other Song(s)...` : `In The Playlist : **${queue.tracks.length}** Song(s)...`}`)
            }
        })
    }
}