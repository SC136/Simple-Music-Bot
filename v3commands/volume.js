module.exports = {
    name: 'volume',
    run: async (client, message, args) => {
        let queue = client.player.getQueue(message.guild.id);
        if (!message.member.voice.channelId) return client.error(message, `You Need To Join A VC!`);
        if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return client.error(message, `You Are Not In The Same VC As Me!`);
        if (!queue) return client.error(message, `There Is No Music Playing In This Server!`);
        if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity' || Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return client.error(message, `Please Enter A Valid Number Between 1 And 100`);
        const success = queue.setVolume(parseInt(args[0]));
        if (success) message.reply({ embeds: [client.embed(`\`\`\`Volume Set To ${parseInt(args[0])}%\`\`\``)] });
    },
};