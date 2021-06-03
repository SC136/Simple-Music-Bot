module.exports = {
    name: 'pause',
    run: (client, message) => {
        const error = client.error;
        if (!message.member.voice.channel) return message.channel.send(error.setDescription('```You Need To Join A VC!```'));
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(error.setDescription('```You Are Not In The Same VC As Me!```'));
        if (!client.player.getQueue(message)) return message.channel.send(error.setDescription('```There Is No Music Playing In This Server!```'));
        if (client.player.getQueue(message).paused) return message.channel.send(error.setDescription('```The Music Is Already Paused```'));
        const success = client.player.pause(message);
        if (success) message.channel.send(client.embed.setDescription(`\`\`\`Song ${client.player.getQueue(message).playing.title} Paused!\`\`\``));
    }
}