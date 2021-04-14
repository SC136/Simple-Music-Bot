const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "skip",
  run: (message, args, client) => {

    const player = client.manager.get(message.guild.id);

    if (!player) return message.reply(
      new MessageEmbed()
        .setDescription('```There Is No Music Playing In This Server!```')
        .setFooter(`Requested By : ${message.author.tag}`, message.author.avatarURL({ "format": "png" }))
        .setColor('#2F3136')
        .setTimestamp()
    );

    const { channel } = message.member.voice;

    if (!channel) return message.reply(
      new MessageEmbed()
        .setDescription('```You Need To Join A VC!```')
        .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ "format": "png" }))
        .setColor('#2F3136')
        .setTimestamp()
    );

    if (channel.id !== player.voiceChannel) return message.reply(
      new MessageEmbed()
        .setDescription('```You Are Not In The Same VC As Me!```')
        .setFooter(`Requested By : ${message.author.tag}`, message.author.avatarURL({ "format": "png" }))
        .setColor('#2F3136')
        .setTimestamp()
    );

    if (!player.queue.current) return message.reply(
      new MessageEmbed()
        .setDescription('```There Is No Music Playing!```')
        .setColor('#2F3136')
    )

    const { title } = player.queue.current;

    player.stop();
    return message.reply(
      new MessageEmbed()
        .setDescription(`\`\`\`${title} Was Skipped.\`\`\``)
        .setColor('#2F3136')
    )
  }
}