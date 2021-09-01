const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'vote',
    run: (client, message) => {
        const embed = new MessageEmbed()
            .setDescription('If You Use Simple Music Bot & You Like It,\nThen Consider Voting The Bot In One Of These List!')
            .setThumbnail(client.user.avatarURL({ format: 'png', size: 4096 }))
            .setTitle(`${client.emoji} You Can Vote Simple Music Bot Here In These Lists :`)
            .addField('Top.gg', `[Vote!](https://top.gg/bot/780838708664467456/vote "Vote On Top.gg!")`, true)
            .addField('Discord Boats', `[Vote!](https://discord.boats/bot/780838708664467456/vote "Vote On Discord Boats!")`, true)
            .addField('Bots For Discord', `[Vote!](https://botsfordiscord.com/bot/780838708664467456/vote "Vote On Bots For Discord!")`, true)
            .addField('Discord Bot List', `[Vote!](https://discordbotlist.com/bots/simple-music-bot/upvote "Vote On Discord Bot List!")`, true)
            .addField('DBots', `[Vote!](https://dbots.co/bots/780838708664467456/vote "Vote On DBots!")`, true)
            .setFooter('Tip : You Can Vote Daily!')
            .setColor("#2F3136");
        message.channel.send({ embeds: [embed] });
    },
};