const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'play',
  run: async (message, args, client) => {

    const { channel } = message.member.voice;

    if (!channel) return message.reply(
      new MessageEmbed()
        .setTitle('You Need To Join A VC!')
        .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({ "format": "png" }))
        .setColor('#2F3136')
        .setTimestamp()
    );

    if (!args.length) return message.reply(
      new MessageEmbed()
        .setTitle('You Need To Give Me A Song Name Or The Link Of The Song You Want To Play!')
        .setColor('#2F3136')
    );

    const player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
    });

    if (player.state !== "CONNECTED") player.connect();

    const search = args.join(" ");
    let res;

    try {
      res = await player.search(search, message.author);
      if (res.loadType === 'LOAD_FAILED') {
        if (!player.queue.current) player.destroy();
        throw res.exception;
      }
      else if (res.loadType === "NO_MATCHES") throw { message: "**No Search Results Found!**" };
    } catch (err) {
      return message.reply(`There Was An Error While Searching : ${err.message}`);
    }

    // Adds the first track to the queue.
    player.queue.add(res.tracks[0]);
    message.channel.send(`Enqueuing Track ${res.tracks[0].title}.`);

    // Plays the player (plays the first track in the queue).
    // The if statement is needed else it will play the current track again
    if (!player.playing && !player.paused && !player.queue.size)
      player.play();

    // For playlists you'll have to use slightly different if statement
    if (
      !player.playing &&
      !player.paused &&
      player.queue.totalSize === res.tracks.length
    )
      player.play();
  },
};

//'you need to give me a URL or a search term.'