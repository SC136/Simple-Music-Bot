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

const player = new Player(client);
client.player = player;

client.player.on("trackStart", (message, track) => message.channel.send(`Now playing ${track.title}...`))

client.error = require('./Error')(MessageEmbed);
client.embed = require('./Embed')(MessageEmbed);

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
    command.run(client, message, args);
    client.channels.cache.get('850294318290829372').send(`${message.author} used ${command.name}`)
  } catch (err) {
    message.reply(`An Error Occurred While Running The Command : ${err.message}`);
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
});

client.login(process.env.DISCORD_BOT_TOKEN);
// client.login('NzgwNjgyMjAzNzYyOTE3NDA3.X7yo9Q.B6UJ6MdOWMiwiS7G_zV1TIZmOV8');