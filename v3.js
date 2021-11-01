require("dotenv").config();
const {
  Client,
  Collection,
  MessageEmbed,
  Intents,
  Permissions,
} = require("discord.js");
const { readdirSync } = require("fs");
const AutoPoster = require("topgg-autoposter");
const { Player } = require("discord-player");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
  allowedMentions: { repliedUser: false },
});
module.exports = client;
client.commands = new Collection();
client.preifx = ".";
const files = readdirSync("./v3commands").filter((file) =>
  file.endsWith(".js")
);
for (const file of files) {
  const command = require(`./v3commands/${file}`);
  client.commands.set(command.name, command);
}
client.embed = require("./embed");
client.error = require("./error");
client.check = require(`./check`);
client.emoji = `<:SimpleMusicBotCircular:881970577873731654>`;
const player = new Player(client, {
  ytdlOptions: {
    requestOptions: {
      headers: {
        cookie:
          "VISITOR_INFO1_LIVE=7BxrRmxxrWs; LOGIN_INFO=AFmmF2swRAIgDxcaeAvpmTxlkLAH3D07_0cGzrVYO39h4B4me1LqSD0CIDrCzau7Qk-WuK5Wy0ubMFfmh9wVPYvjfDQOfkTON_wK:QUQ3MjNmd2lmVGs3NDRGMFhwcHgzSEgwbFpFbU4xTzZvOW5yZ3Q5N2ZseGRKQlkwbDhrbG9taWV5RXNfXzJpS2cydE1DLWU4T3Jud3ppQXZZemx5anhHcGxUb3dhUEpZaXh4XzNnc3BzSWVVVEFCb2JSMUlDdDQxSjhuNVY2NGlPQ1I4cWE4bV9ZejlDSDh2dEl1dVRidThzMWJzaVlieEdR; PREF=f4=4000000&tz=Asia.Calcutta&f6=40000000; NID=511=UvcWObqOG2IgbLmQ36Qmpx2PDcZDfv0mJw54ZDX0nuQipd9g6543KTl6FpQc2rEDava664dOYTwNf2jea9vLhg6OfF9sycdZU_HI43e8_-1bmGYmLENGj2Mw2D1Ut9kPy7hA7L3tAjtkvA1HhgafUOBWFgrBrQE0zRAWxnl1kO4; SID=DQiZz1ihfQff3QNmEqpdI_eao9Cmo2ry7asnL8WpKVTWmq2mgnl1ccm2UJ5d7wNPLrUouw.; __Secure-1PSID=DQiZz1ihfQff3QNmEqpdI_eao9Cmo2ry7asnL8WpKVTWmq2mJIjGWY7vSk_yPKB39TCSsA.; __Secure-3PSID=DQiZz1ihfQff3QNmEqpdI_eao9Cmo2ry7asnL8WpKVTWmq2mXR4JdudF2aTZjZQ7OMAybQ.; HSID=A9EzRorJkxflo2f1U; SSID=AY_6Mej9M5g7PzBhQ; APISID=5gz7no4yigcVcp-X/AlOjJNT-kj-w5eWhg; SAPISID=XWxn0s-Fu46S6ego/AR9Fh-vii4NVjKYDq; __Secure-1PAPISID=XWxn0s-Fu46S6ego/AR9Fh-vii4NVjKYDq; __Secure-3PAPISID=XWxn0s-Fu46S6ego/AR9Fh-vii4NVjKYDq; YSC=mvvgMPCJdGc; CONSISTENCY=AGDxDeNmQMD3Dxp3_KD1VfgiixLAzjl0eC4GLOw1fnjAdZ3b8oxBx_ihv2ota87gsdcGP4GJzkUEILL3Mlbhl3sa6V6r9V9NhSxOpykhI7bDl_IwySF4-3bLxJh_60fAgNTzJvJX5JTeidBcUS2Hdb3w; SIDCC=AJi4QfGsZTw_FC3O0Qd2bQoNJjs3ASk_CFdO4B6bRBh6ldierOGd5lxQ56O86tVMlQ-ZezXnwp0; __Secure-3PSIDCC=AJi4QfHJcrYXNpBeWOIfJ1-VcwGJJhbu3jCN4PiTpXMcEyhxhyym6e6Mh-12pi-WwITodXPyaA",
      },
    },
  },
  leaveOnEnd: false,
  leaveOnStop: false,
  leaveOnEmptyCooldown: 60000,
});
client.player = player;
client.player
  .on("trackStart", (queue, track) =>
    queue.metadata.channel.send({
      embeds: [
        client
          .embed(`**Now Playing :**\n\`\`\`fix\n${track.title}\`\`\``)
          .setFooter(
            `Requested By ${track.requestedBy.tag}`,
            track.requestedBy.avatarURL({
              format: "png",
              size: 4096,
              dynamic: true,
            })
          ),
      ],
    })
  )
  .on("trackAdd", (queue, track) =>
    queue.metadata.channel.send({
      embeds: [
        client
          .embed(`**Song Added :**\`\`\`fix\n${track.title}\`\`\``)
          .setFooter(
            `Requested By ${track.requestedBy.tag}`,
            track.requestedBy.avatarURL({
              format: "png",
              size: 4096,
              dynamic: true,
            })
          ),
      ],
    })
  )
  .on("queueEnd", (queue) =>
    queue.metadata.channel.send({
      embeds: [client.embed("```The Queue Has Ended!```")],
    })
  )
  .on("botDisconect", (queue) =>
    queue.metadata.channel.send({
      embeds: [client.embed("```VC Disconnected!```")],
    })
  )
  .on("channelEmpty", (query) =>
    query.metadata.channel.send({
      embeds: [client.embed("```The VC Is Empty!```")],
    })
  )
  .on("error", (queue, error) =>
    queue.metadata.channel.send({
      embeds: [client.embed(`\`\`\`diff\n- ${error}\`\`\``)],
    })
  );
client.once("ready", () => {
  console.log(
    `Bot Has Logged in And Is Playing Music! \nSimple Music Bot Is In ${client.guilds.cache.size} Servers! \n${client.users.cache.size} People Are Using Simple Music Bot! \nTotal Channels : ${client.channels.cache.size}!`
  );
  client.user.setActivity(`Simplicity | .help | Simply Simple Music Bot!`, {
    type: "LISTENING",
  });
  // client.user.setActivity(`Simplicity | Type .help | I Am In ${client.guilds.cache.size} Servers! & ${client.users.cache.size} People Are Using Me!`, { type: "LISTENING" });
});
client.on("messageCreate", async (message) => {
  if (
    !message.content.startsWith(client.preifx) ||
    !message.guild ||
    message.author.bot
  )
    return;
  if (
    !message.guild.me
      .permissionsIn(message.channel)
      .has(Permissions.FLAGS.SEND_MESSAGES)
  )
    return;
  const [name, ...args] = message.content.slice(1).split(/\s+/g);
  const command = client.commands.get(name);
  if (!command) return;
  try {
    command.run(client, message, args);
    client.channels.cache
      .get("850294318290829372")
      .send(
        `Someone Used \`${command.name}\` Command In **${message.guild.name}**!`
      );
  } catch (err) {
    client.error(
      message,
      `An Error Occurred While Running The Command : ${err.message}`
    );
    client.channels.cache.get("850294318290829372").send({
      embeds: [
        client.embed(
          `An Error Occured While Executing The \`${command.name}\` Command In **${message.guild.name}!**\n\`\`\`${err.stack}\`\`\``
        ),
      ],
    });
  }
});
client.on(`messageCreate`, (message) => {
  if (
    message.content === `<@${client.user.id}>` ||
    message.content === `<@!${client.user.id}>`
  )
    return message.reply({
      embeds: [
        client.embed(
          `\`\`\`js\nMy Prefix Is '.'\nType '.help' To Get Started!\`\`\``
        ),
      ],
    });
});
const logsChannel = "811499611285225492";
client.on("guildCreate", (guild) => {
  client.channels.cache.get(logsChannel).send({
    embeds: [
      new MessageEmbed()
        .setTitle("New Server!")
        .setThumbnail(guild.iconURL({ size: 4096, dynamic: true }))
        .addField("Name :", `\`\`\`${guild.name}\`\`\``, true)
        .addField("Server ID :", `\`\`\`${guild.id}\`\`\``, true)
        .addField("Members :", `\`\`\`${guild.memberCount}\`\`\``, true)
        .addField("Emojis :", `\`\`\`${guild.emojis?.cache.size}\`\`\``, true)
        .addField(
          "Channels :",
          `\`\`\`${guild.channels.cache.size}\`\`\``,
          true
        )
        .addField("Owner ID :", `\`\`\`${guild.ownerID}\`\`\``, true)
        .addField("Owner :", `${guild.owner}`, true)
        .setFooter(`Currently In ${client.guilds.cache.size} Servers!`)
        .setTimestamp()
        .setColor("#2F3136"),
    ],
  });
});
client.on("guildDelete", (guild) => {
  client.channels.cache.get(logsChannel).send({
    embeds: [
      new MessageEmbed()
        .setTitle("Server Removed!")
        .setThumbnail(guild.iconURL({ size: 4096, dynamic: true }))
        .setDescription("Guild Info :")
        .addField("Name :", `\`\`\`${guild.name}\`\`\``, true)
        .addField("Server ID :", `\`\`\`${guild.id}\`\`\``, true)
        .addField("Members :", `\`\`\`${guild.memberCount}\`\`\``, true)
        .addField("Emojis :", `\`\`\`${guild.emojis?.cache.size}\`\`\``, true)
        .addField(
          "Channels :",
          `\`\`\`${guild.channels.cache.size}\`\`\``,
          true
        )
        .addField("Owner ID :", `\`\`\`${guild.ownerID}\`\`\``, true)
        .addField("Owner :", `${guild.owner}`, true)
        .setFooter(`Currently In ${client.guilds.cache.size} Servers!`)
        .setColor("#2F3136")
        .setTimestamp(),
    ],
  });
});
const ap = AutoPoster(process.env.TOPGG_TOKEN, client);
ap.on("posted", () => {
  console.log("Posted Stats to Top.gg");
});

process.on("uncaughtException", function (err) {
  console.log("caught exception: " + err);
});

client.login(process.env.DISCORD_BOT_TOKEN);
// client.login('NzgwNjgyMjAzNzYyOTE3NDA3.X7yo9Q.B6UJ6MdOWMiwiS7G_zV1TIZmOV8') // for testing purposes...
