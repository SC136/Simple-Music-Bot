module.exports = {
    name: 'skip',
    run: (client, message) => {
        const error = client.error;
        if (!message.member.voice.channel) return message.channel.send(error.setDescription(```You Need To Join A VC!```));

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(error.setDescription('```You Are Not In The Same VC As Me!```'));

        if (!client.player.getQueue(message)) return message.channel.send(error.setDescription('```There Is No Music Currently Playing!```'));

        const success = client.player.skip(message);

        if (success) message.channel.send(client.embed.setDescription(`\`\`\`The Current Song Has Been Skipped!\`\`\``));
    }
}