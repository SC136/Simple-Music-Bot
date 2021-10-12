const { MessageEmbed } = require("discord.js");
const { default: axios } = require("axios")

module.exports = {
  name: "searchlyrics",
  description: "Search for a song's lyrics",
  run: async (client, message, args) => {

    function substring(length, value) {
      const replaced = value.replace(/\n/g, "--");
      const regex = `.{1,${length}}`;
      const lines = replaced
        .match(new RegExp(regex, "g"))
        .map((line) => line.replace(/--/g, "\n"));

      return lines;
    }
if (!args[0]) return client.error(message, `You need to enter a song name to search its lyrics`)
    const title = args.join(' ');

    const url = new URL('https://some-random-api.ml/lyrics');
    url.searchParams.append('title', title)
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