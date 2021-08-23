module.exports = {
    name: 'play',
    aliases: ['p'],
    description: 'Plays Song',
    run: async (client, message, args) => {
        if (!message.member.voice.channelId) return await client.error(message, `You Need To Join A VC!`);
        if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return await client.error(message, `You Are Not In The Same VC As Me!`);
        if (!args[0]) return await client.error(message, `You Need To Give Me A Song Name Or The Link Of The Song You Want To Play!`);
        const queue = client.player.createQueue(message.guild, {
            metadata: message
        });
        try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                queue.destroy();
                return await client.error(message, `Could not join your voice channel!`);
            }
            const track = await client.player.search(args.join(' '), {
             requestedBy: message.author
            }).then(x => x.tracks[0]);
            if (!track) return await client.error(message, `No Songs Found For The Given Query!`);
            queue.play(track);
    },
};