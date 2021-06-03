module.exports = {
    name: 'volume',
    run: (client, message, args) => {
        const error = client.error;
        if (!message.member.voice.channel) return message.channel.send(error.setDescription(```You Need To Join A VC!```));

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(error.setDescription('```You Are Not In The Same VC As Me!```'));

        if (!client.player.getQueue(message)) return message.channel.send(error.setDescription('```There Is No Music Currently Playing!```'));

        if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') return message.channel.send(error.setDescription('```You Need To Give Me A Volume Between 1 To 100```'));

        if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return message.channel.send(`${client.emotes.error} - Please enter a valid number (between 1 and 100) !`);

        const success = client.player.setVolume(message, parseInt(args[0]));

        if (success) message.channel.send(client.embed.setDescription(`\`\`\`Volume Set To ${parseInt(args[0])}%\`\`\``));
    }
}