const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "server",
  run: async (client, message) => {
    const embed = new MessageEmbed()
      .setTitle(`${client.emoji} Simple Music Bot Support Server Invite Link :`)
      .setThumbnail(
        `${client.user.displayAvatarURL({ format: `png`, size: 4096 })}`
      )
      .setDescription(
        "Click [Here](https://discord.gg/Qysc2PXp5e) To Join The Support Server"
      )
      .setColor("#2F3136");
    message.channel.send({ embeds: [embed] });
  },
};
