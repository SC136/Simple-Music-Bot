const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "The Help Command!",
  run: async (client, message) => {
    const embed = new MessageEmbed()
      .setTitle(`${client.emoji} Simple Music Bot Help Command`)
      .setThumbnail(`${client.user.displayAvatarURL()}`)
      .setDescription("```Simply Simple Music Bot!```")
      .addField(
        ".play",
        "```.play <songname> (Simply Plays A Song In The VC You Are In```",
        true
      )
      .addField(".volume", "```Adjust The Volume Of The Music```", true)
      .addField(".pause", "```Pauses The Music```", true)
      .addField(".resume", "```Resumes The Music```", true)
      .addField(".loop", "```Repeats The Music```", true)
      .addField(".queue", "```Shows You The Current Queue```")
      .addField(".stop", "```Simply Stops The Song```", true)
      //.addField('.join', '```Simply Joins The VC You Are In```', true)
      //.addField('.leave', '```Simply Leaves The VC```', true)
      .addField(".ping", "```Simply Shows You The Latency```", true)
      .addField(
        ".server",
        "```Gives You The Support Server Invite Link```",
        true
      )
      .addField(
        ".invite",
        "```Gives You The Link To Invite The Bot In Your Server```",
        true
      )
      .addField(
        ".vote",
        "```Gives You A List Where You Can Vote The Bot!```",
        true
      )
      .addField(".uptime", "```Give You The Bot's Uptime!```", true)
      .addField(".botinfo", "```Give Some Info/Stats About The Bot```", true)
      .setColor("#2F3136")
      .setFooter(
        "If You Need Any Help Join The Support Server! Type `.server` To Get The Link!"
      );
    message.channel.send({ embeds: [embed] });
  },
};
