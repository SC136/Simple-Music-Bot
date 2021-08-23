module.exports = {
    name: 'skip',
    run: (client, message) => {
        let queue = client.player.getQueue(message.guild.id);
        if (!message.member.voice.channelId) return client.error(message, `You Need To Join A VC!`);
        if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return client.error(message, `You Are Not In The Same VC As Me!`);
        if (!queue) return client.error(message, `There Is No Music Playing In This Server!`);
        const success = queue.skip();
        if (success) message.reply({ embeds: [client.embed('```The Current Song Has Been Skipped!```')] });
    },
};