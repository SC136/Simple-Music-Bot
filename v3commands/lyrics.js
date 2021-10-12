const { MessageEmbed } = require("discord.js");
const { default: axios } = require("axios");

module.exports = {
  name: "lyrics",
  description: "Get the current playing song's lyrics",
  run: async (client, message, args) => {
    function substring(length, value) {
      const replaced = value.replace(/\n/g, "--");
      const regex = `.{1,${length}}`;
      const lines = replaced
        .match(new RegExp(regex, "g"))
        .map((line) => line.replace(/--/g, "\n"));

      return lines;
    }

    let queue = client.player.getQueue(message.guild.id);
    if (!message.member.voice.channelId) {
      return (
        client.error(message, `You Need To Join A VC!`) &&
        message.channel.send(
          `If you want to find lyrics for a particular song then use \`.searchlyrics\` command`
        )
      );
    }
    if (
      message.guild.me.voice.channelId &&
      message.member.voice.channelId !== message.guild.me.voice.channelId
    )
      return client.error(message, `You Are Not In The Same VC As Me!`);
    if (!queue)
      return (
        client.error(message, `There Is No Music Playing In This Server!`) &&
        message.channel.send(
          `If you want to find lyrics for a particular song then use \`.searchlyrics\` command`
        )
      );
    const track = queue.current;

    const title = track.title;

    const url = new URL("https://some-random-api.ml/lyrics");
    url.searchParams.append("title", title);
    try {
      const { data } = await axios.get(url.href);

      const embeds = substring(4096, data.lyrics).map((value, index) => {
        const isFirst = index === 0;

        return new MessageEmbed({
          title: isFirst ? `${data.title} : ${data.author}` : null,
          thumbnail: isFirst ? { url: data.thumbnail.genius } : null,
          description: `\`\`\`${value}\`\`\``,
          color: `#2f3136`,
        });
      });

      return message.reply({ embeds });
    } catch (err) {
      client.error(message, `Lyrics not found`);
    }
  },
};
