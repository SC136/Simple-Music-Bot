const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "resume",
  run: (message, args, client) => {

    const player = client.manager.get(message.guild.id);

    if (!player) return message.reply(
      new MessageEmbed()
        .setTitle('There Is No Music Playing In This Server!')
        .setFooter(`Requested By : ${msg.author.tag}`, msg.author.avatarURL({ "format": "png" }))
        .setColor('#2F3136')
        .setTimestamp()
    );

    const { channel } = message.member.voice;

    if (!channel) return message.reply(
      new MessageEmbed()
        .setTitle('You Need To Join A VC!')
        .setFooter(`Requested By: ${msg.author.tag}`, msg.author.avatarURL({ "format": "png" }))
        .setColor('#2F3136')
        .setTimestamp()
    );

    if (channel.id !== player.voiceChannel) return message.reply(
      new MessageEmbed()
        .setTitle('You Are Not In The Same VC As Me!')
        .setFooter(`Requested By : ${msg.author.tag}`, msg.author.avatarURL({ "format": "png" }))
        .setColor('#2F3136')
        .setTimestamp()
    );

    if (!player.paused) return message.reply(
      new MessageEmbed()
        .setTitle('The Player Is Already Resumed!')
        .setColor('#2F3136')
    );

    player.pause(false);
    return message.reply(
      new MessageEmbed()
        .setTitle('Resumed The Player!')
        .setColor('#2F3136')
    );
  }
}