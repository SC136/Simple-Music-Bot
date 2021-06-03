module.exports = {
    name: 'repeat',
    run: (client, message, args) => {
        const error = client.error;
        const embed = client.embed;
        if (!message.member.voice.channel) return message.channel.send(error.setDescription('```You Need To Join A VC!```'));

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(error.setDescription('```You Are Not In The Same VC As Me!```'));

        if (!client.player.getQueue(message)) return message.channel.send(error.setDescription('```There Is No Music Currently Playing!```'));

        if (args.join(" ").toLowerCase() === 'queue') {
            if (client.player.getQueue(message).loopMode) {
                client.player.setLoopMode(message, false);
                return message.channel.send(embed.setDescription('```Repeat Mode Disabled!```'));
            } else {
                client.player.setLoopMode(message, true);
                return message.channel.send(embed.setDescription('```Repeat Mode Enabled, The Whole Queue Will Be Now Repeated!```'));
            };
        } else {
            if (client.player.getQueue(message).repeatMode) {
                client.player.setRepeatMode(message, false);
                return message.channel.send(embed.setDescription('```Repeat Mode Disabled!```'));
            } else {
                client.player.setRepeatMode(message, true);
                return message.channel.send(embed.setDescription('```Repeat Mode Enabled, The Current Song Will Be Now Repeated!```'));
            };
        };
    },
};