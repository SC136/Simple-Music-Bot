const { Client, VoiceState, MessageEmbed } = require("discord.js");
const {
  play,
  stop,
  help,
  ping,
  server,
  servers,
  users,
  invite,
  vote,
  uptime,
  botinfo,
  join,
  leave,
  topguilds,
} = require("./commands");
const AutoPoster = require("topgg-autoposter");
//const Discord = require('discord.js')
//Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android"
const bot = new Client();

const ap = AutoPoster(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc4MDgzODcwODY2NDQ2NzQ1NiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjEwODY5MjI5fQ.JSpTq_AuZQGJai_C61sP8QWziyUmspNjmwgfGnIogao",
  bot
); // your discord.js or eris client

const logsChannel = "811499611285225492";

bot.login();

bot.on("ready", () => {
  console.log(
    `Bot Has Logged in And Is Playing Music! \nSimple Music Bot Is In ${
      bot.guilds.cache.size
    } Servers! \n${bot.guilds.cache.reduce(
      (a, g) => a + g.memberCount,
      0
    )} People Are Using Simple Music Bot! \nTotal Channels : ${
      bot.channels.cache.size
    }!`
  );
  bot.user.setActivity(
    `Simplicity | Type .help | I Am In ${bot.guilds.cache.size} Servers! & ${bot.users.cache.size} People Are Using Me!`,
    { type: "LISTENING" }
  );
});

ap.on("posted", () => {
  // ran when succesfully posted
  console.log("Posted Stats to Top.gg");
});

bot.on("message", (msg) => {
  if (msg.author.bot) return;

  const prefix = ".";
  if (!msg.content.startsWith(prefix)) return;

  const commandName = getCommandName(prefix, msg.content);
  const args = getCommandArgs(prefix, msg.content);

  if (commandName === "play") return play(bot, msg, args);
  else if (commandName === "stop") return stop(msg, args);
  else if (commandName === "join") return join(msg);
  else if (commandName === "leave") return leave(msg);
  else if (commandName === "help") return help(bot, msg, args);
  else if (commandName === "ping") return ping(msg, args);
  else if (commandName === "server") return server(bot, msg, args);
  else if (commandName === "servers") return servers(bot, msg, args);
  else if (commandName === "users") return users(bot, msg, args);
  else if (commandName === "invite") return invite(bot, msg, args);
  else if (commandName === "vote") return vote(bot, msg, args);
  else if (commandName === "uptime") return uptime(msg, args);
  else if (commandName === "botinfo") return botinfo(bot, msg);
  else if (commandName === "topguilds") return topguilds(bot, msg);
});

bot.on("guildCreate", (guild) => {
  bot.channels.cache.get(logsChannel).send(
    new MessageEmbed()
      .setTitle("New Server!")
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addField("Name :", `\`\`\`${guild.name}\`\`\``, true)
      .addField("Server ID :", `\`\`\`${guild.id}\`\`\``, true)
      .addField("Members :", `\`\`\`${guild.memberCount}\`\`\``, true)
      .addField("Emojis :", `\`\`\`${guild.emojis?.cache.size}\`\`\``, true)
      .addField("Channels :", `\`\`\`${guild.channels.cache.size}\`\`\``, true)
      .addField("Owner ID :", `\`\`\`${guild.ownerID}\`\`\``, true)
      .addField("Owner :", `${guild.owner}`, true)
      .setFooter(`Currently In ${bot.guilds.cache.size} Servers!`)
      .setTimestamp()
      .setColor("#2F3136")
  );
});

bot.on("guildDelete", (guild) => {
  bot.channels.cache.get(logsChannel).send(
    new MessageEmbed()
      .setTitle("Server Removed!")
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setDescription("Guild Info :")
      .addField("Name :", `\`\`\`${guild.name}\`\`\``, true)
      .addField("Server ID :", `\`\`\`${guild.id}\`\`\``, true)
      .addField("Members :", `\`\`\`${guild.memberCount}\`\`\``, true)
      .addField("Emojis :", `\`\`\`${guild.emojis?.cache.size}\`\`\``, true)
      .addField("Channels :", `\`\`\`${guild.channels.cache.size}\`\`\``, true)
      .addField("Owner ID :", `\`\`\`${guild.ownerID}\`\`\``, true)
      .addField("Owner :", `${guild.owner}`, true)
      .setFooter(`Currently In ${bot.guilds.cache.size} Servers!`)
      .setColor("#2F3136")
      .setTimestamp()
  );
});

function getCommandName(prefix, content) {
  return content.slice(prefix.length).split(" ")[0];
}
function getCommandArgs(prefix, content) {
  return content.slice(prefix.length).split(" ").slice(1);
}
