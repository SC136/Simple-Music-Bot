module.exports = {
    name: 'resume',
    run: (client, message) => {
        let queue = client.player.getQueue(message.guild.id);
        if (!message.member.voice.channelId) return client.error(message, `You Need To Join A VC!`);
        if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return client.error(message, `You Are Not In The Same VC As Me!`);
        if (!queue) return client.error(message, `There Is No Music Playing In This Server!`);
        if (!queue.connection.paused) return client.error(message, `The Music Is Already Resumed!`);
        const success = queue.setPaused(false);
        if (success) message.reply({ embeds: [client.embed(`\`\`\`Song ${client.player.getQueue(message.guild.id).current.title} Resumed!\`\`\``)] });
    },
};