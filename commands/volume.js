const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "volume",
  run: (message, args, client) => {

    const player = client.manager.get(message.guild.id);

    if (!player) return message.reply(
      new MessageEmbed()
        .setDescription('```There Is No Music Playing In This Server!```')
        .setFooter(`Requested By : ${message.author.tag}`, message.author.avatarURL({ "format": "png" }))
        .setColor('#2F3136')
        .setTimestamp()
    );

    if (!args.length) return message.reply(
      new MessageEmbed()
        .setTitle(`The Music Volume Is \`${player.volume}\`.`)
        .setColor('#2F3136')
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

    const volume = Number(args[0]);

    if (!volume || volume < 1 || volume > 100) return message.reply("You Need To Give Me A Volume Between 1 And 100.");

    player.setVolume(volume);
    return message.reply(
      new MessageEmbed()
        .setTitle(`Set The Player Volume To \`${volume}\`.`)
        .setColor('#2F3136')
    );
  }
}