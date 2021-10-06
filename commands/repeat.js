const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "repeat",
  run: (message, args, client) => {
    const player = client.manager.get(message.guild.id);

    if (!player)
      return message.reply(
        new MessageEmbed()
          .setDescription("```There Is No Music Playing In This Server!```")
          .setFooter(
            `Requested By : ${message.author.tag}`,
            message.author.avatarURL({ format: "png" })
          )
          .setColor("#2F3136")
          .setTimestamp()
      );

    const { channel } = message.member.voice;

    if (!channel)
      return message.reply(
        new MessageEmbed()
          .setDescription("```You Need To Join A VC!```")
          .setFooter(
            `Requested By: ${message.author.tag}`,
            message.author.avatarURL({ format: "png" })
          )
          .setColor("#2F3136")
          .setTimestamp()
      );

    if (channel.id !== player.voiceChannel)
      return message.reply(
        new MessageEmbed()
          .setDescription("```You Are Not In The Same VC As Me!```")
          .setFooter(
            `Requested By : ${message.author.tag}`,
            message.author.avatarURL({ format: "png" })
          )
          .setColor("#2F3136")
          .setTimestamp()
      );

    if (args.length && /queue/i.test(args[0])) {
      player.setQueueRepeat(!player.queueRepeat);
      const queueRepeat = player.queueRepeat ? "Enabled" : "Disabled";
      return message.reply(`${queueRepeat} Queue Repeat.`);
    }

    player.setTrackRepeat(!player.trackRepeat);
    const trackRepeat = player.trackRepeat ? "Enabled" : "Disabled";
    return message.reply(`${trackRepeat} Track Repeat.`);
  },
};
