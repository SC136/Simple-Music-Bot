const { QueueRepeatMode } = require("discord-player");
module.exports = {
    name: 'loop',
    run: (client, message, args) => {
        let queue = client.player.getQueue(message.guild.id);
        if (!message.member.voice.channelId) return client.error(message, `You Need To Join A VC!`);
        if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return client.error(message, `You Are Not In The Same VC As Me!`);
        if (!queue) return client.error(message, `There Is No Music Playing In This Server!`);
        if (args.join(' ').toLowerCase() === 'queue') {
            if (queue.repeatMode === `2`) {
                queue.setRepeatMode(QueueRepeatMode.OFF);
                return message.reply({ embeds: [client.embed('```Queue Repeat Mode Disabled!```')] });
            } else {
                queue.setRepeatMode(QueueRepeatMode.QUEUE);
                return message.reply({ embeds: [client.embed('```Repeat Mode Enabled, The Whole Queue Will Be Now Repeated!```')] });
            };
        } else {
            if (queue.repeatMode === `1`) {
                queue.setRepeatMode(QueueRepeatMode.OFF);
                return message.reply({ embeds: [client.embed('```Track Repeat Mode Disabled!```')] });
            } else {
                queue.setRepeatMode(QueueRepeatMode.TRACK);
                return message.reply({ embeds: [client.embed('```Repeat Mode Enabled, The Current Song Will Be Now Repeated!```')] });
            };
        };
    },
};