require('dotenv').config();
const { Client, Collection, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const AutoPoster = require('topgg-autoposter');
const { Player } = require('discord-player');

const client = new Client();
client.commands = new Collection();

client.preifx = '.';

const files = readdirSync("./V3 Commands")
  .filter(file => file.endsWith(".js"));

for (const file of files) {
  const command = require(`./V3 Commands/${file}`);
  client.commands.set(command.name, command);
}
client.embed = require('./Embed')(MessageEmbed);
client.error = require('./Error')(MessageEmbed);

const player = new Player(client, { leaveOnEndCooldown: 60000, leaveOnEmptyCooldown: 60000 });
client.player = player;

client.player
  .on("trackStart", (message, track) => message.channel.send(client.embed.setDescription(`**Now Playing :**\n\`\`\`prolog\n${track.title}\`\`\``).setFooter(`Requested By ${track.requestedBy.username}`)))
  .on("trackAdd", (message, queue, track) => message.channel.send(client.embed.setDescription(`**Song Added :**\`\`\`prolog\n${track.title}\`\`\``).setFooter(`Requested By ${track.requestedBy.username}`)))
  .on("queueEnd", (message, queue) => message.channel.send(client.embed.setDescription('```The Queue Has Ended, I Will Be In The VC For 1 More Minute!```')))
  .on("noResults", (message, query) => message.channel.send(client.error.setDescription(`**No Songs Found For Query :**\n\`\`\`${query}\`\`\``)))
  .on("botDisconect", (message) => message.channel.send(client.embed.setDescription('```VC Disconnected!```')))
  .on("channelEmpty", (message) => message.channel.send(client.embed.setDescription('```The VC Is Empty!```')))
  .on("error", (error, message) => message.channel.send(client.error.setDescription(`\`\`\`${error}\`\`\``)))

client.once("ready", () => {
  console.log(`Bot Has Logged in And Is Playing Music! \nSimple Music Bot Is In ${client.guilds.cache.size} Servers! \n${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} People Are Using Simple Music Bot! \nTotal Channels : ${client.channels.cache.size}!`);
  client.user.setActivity(`Simplicity | Type .help | I Am In ${client.guilds.cache.size} Servers! & ${client.users.cache.size} People Are Using Me!`, { type: "LISTENING" });
});

client.on("message", async message => {
  if (!message.content.startsWith(client.preifx) || !message.guild || message.author.bot) return;
  const [name, ...args] = message.content.slice(1).split(/\s+/g);

  const command = client.commands.get(name);
  if (!command) return;

  try {
    command.run(client, message, args)
    client.channels.cache.get('850294318290829372').send(`Someone Used \`${command.name}\` Command In **${message.guild.name}**!`)
  } catch (err) {
    message.reply(`An Error Occurred While Running The Command : ${err.message}`)
    client.channels.cache.get('850294318290829372').send(`An Error Occured While Executing The \`${command.name}\` Command In **${message.guild.name}!**`)
  }
});

const logsChannel = '811499611285225492';

client.on('guildCreate', (guild) => {
  client.channels.cache.get(logsChannel).send(
    new MessageEmbed()
      .setTitle('New Server!')
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addField("Name :", `\`\`\`${guild.name}\`\`\``, true)
      .addField("Server ID :", `\`\`\`${guild.id}\`\`\``, true)
      .addField("Members :", `\`\`\`${guild.memberCount}\`\`\``, true)
      .addField("Emojis :", `\`\`\`${guild.emojis?.cache.size}\`\`\``, true)
      .addField("Channels :", `\`\`\`${guild.channels.cache.size}\`\`\``, true)
      .addField("Owner ID :", `\`\`\`${guild.ownerID}\`\`\``, true)
      .addField("Owner :", `${guild.owner}`, true)
      .setFooter(`Currently In ${client.guilds.cache.size} Servers!`)
      .setTimestamp()
      .setColor('#2F3136')
  );
});

client.on('guildDelete', (guild) => {
  client.channels.cache.get(logsChannel).send(
    new MessageEmbed()
      .setTitle('Server Removed!')
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setDescription('Guild Info :')
      .addField("Name :", `\`\`\`${guild.name}\`\`\``, true)
      .addField("Server ID :", `\`\`\`${guild.id}\`\`\``, true)
      .addField("Members :", `\`\`\`${guild.memberCount}\`\`\``, true)
      .addField("Emojis :", `\`\`\`${guild.emojis?.cache.size}\`\`\``, true)
      .addField("Channels :", `\`\`\`${guild.channels.cache.size}\`\`\``, true)
      .addField("Owner ID :", `\`\`\`${guild.ownerID}\`\`\``, true)
      .addField("Owner :", `${guild.owner}`, true)
      .setFooter(`Currently In ${client.guilds.cache.size} Servers!`)
      .setColor('#2F3136')
      .setTimestamp()
  );
});

const ap = AutoPoster(process.env.TOPGG_TOKEN, client)
ap.on('posted', () => {
  console.log('Posted Stats to Top.gg')
})
client.login(process.env.DISCORD_BOT_TOKEN)
// client.login('NzgwNjgyMjAzNzYyOTE3NDA3.X7yo9Q.B6UJ6MdOWMiwiS7G_zV1TIZmOV8')