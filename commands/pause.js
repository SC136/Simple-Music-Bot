const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "pause",
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

    if (player.paused)
      return message.reply(
        new MessageEmbed()
          .setDescription("```The Music Is Already Paused```")
          .setFooter(
            `Requested By : ${message.author.tag}`,
            message.author.avatarURL({ format: "png" })
          )
          .setColor("#2F3136")
          .setTimestamp()
      );

    player.pause(true);
    return message.reply(
      new MessageEmbed()
        .setDescription("```Paused The Music!```")
        .setFooter(
          `Requested By : ${message.author.tag}`,
          message.author.avatarURL({ format: "png" })
        )
        .setColor("#2F3136")
        .setTimestamp()
    );
  },
};

//"there is no player for this guild."
//"you need to join a voice channel."
//"you're not in the same voice channel."
//"the player is already paused."
//"paused the player."
