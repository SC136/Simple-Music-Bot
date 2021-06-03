module.exports = {
    name: 'play',
    aliases: ['p'],
    run: (client, message, args) => {
        const error = client.error;
        if (!message.member.voice.channel) return message.channel.send(error.setDescription('```You Need To Join A VC!```'));
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(error.setDescription('```You Are Not In The Same VC As Me!```'));
        if (!args[0]) return message.channel.send(error.setDescription('```You Need To Give Me A Song Name Or The Link Of The Song You Want To Play!```'));
        client.player.play(message, args.join(" "), { firstResult: true });
    },
};