const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "queue",
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

    const queue = player.queue;

    const embed = new MessageEmbed()
      .setAuthor(`Queue For ${message.guild.name}`)
      .setColor("#2F3136");

    // change for the amount of tracks per page
    const multiple = 10;
    const page = args.length && Number(args[0]) ? Number(args[0]) : 1;

    const end = page * multiple;
    const start = end - multiple;

    const tracks = queue.slice(start, end);

    if (queue.current)
      embed.addField(
        "Current",
        `[${queue.current.title}](${queue.current.uri})`
      );

    if (!tracks.length)
      embed.setDescription(
        `No Tracks In ${page > 1 ? `page ${page}` : "the queue"}.`
      );
    else
      embed.setDescription(
        tracks
          .map((track, i) => `${start + ++i} - [${track.title}](${track.uri})`)
          .join("\n")
      );

    const maxPages = Math.ceil(queue.length / multiple);

    embed.setFooter(`Page ${page > maxPages ? maxPages : page} of ${maxPages}`);

    return message.reply(embed);
  },
};
