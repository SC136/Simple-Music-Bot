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
          "VISITOR_INFO1_LIVE=915lzshV3p8; PREF=f4=4000000&tz=Asia.Calcutta&f6=40000000; GPS=1; YSC=jh6w7uj-at4; SID=FgjBn_cT2LI0aYX07v7DGuio6u_LeulKswUG4FxNRpObK2nVlJyBwPSitBtipKfajFJLCQ.; __Secure-1PSID=FgjBn_cT2LI0aYX07v7DGuio6u_LeulKswUG4FxNRpObK2nVemHLDz93PwNWzlY88FpYIw.; __Secure-3PSID=FgjBn_cT2LI0aYX07v7DGuio6u_LeulKswUG4FxNRpObK2nVha9lbsEtQ4mg2Rs0PTN_Yg.; HSID=AXokDqIcONRrUYgih; SSID=AtYLqgQ-1wd8Nh_Ls; APISID=WYKy7uLLQoknxXKO/AtU9-kLN0EcCEtZVZ; SAPISID=LrkbOwQdXPEdrHe3/AIaPdrcZXWEa7a2Dz; __Secure-1PAPISID=LrkbOwQdXPEdrHe3/AIaPdrcZXWEa7a2Dz; __Secure-3PAPISID=LrkbOwQdXPEdrHe3/AIaPdrcZXWEa7a2Dz; LOGIN_INFO=AFmmF2swRQIhAMESwht694RAV-c2PAvkRgTJYUuZIi-AeJrWlQVuHfPyAiBLRdLi4VQdS3-wmzJGKx7F0-cYkgPsJM_D5WI75GAZWA:QUQ3MjNmemh1S21VbkNhTEFfS2NGdmZsZHl5S0tyd1FxcWpsZFB6a3RSUHh4V0JmWnRBemhDYWxFelY3VnA3M3JLdm04XzRQNU1uY3dyUDFrWEU3OVdETkJMRnphM1YzOEJwSlhwU09uYmJFT2g1WmJHNm40RU5hLUhFdkZFdHdUbm9YdWdpRHdjckpwdVFGUUlfYXBHNWdUdTRjN0QtYnFn; CONSISTENCY=AGDxDeM40gCYdFm6wXjpfsOrWUhFiiV532zXlBFIUew7FlkSlTCOWpK0Mt-g5sIGKJeJBX_jY0RdT5tcDfTcvzQ9cx2aIn1FN4CNQSr2spjy8hAqIlzK9yOQ4sgc-KGJby_1mvvyieTHtpyiN90FNS2eG0JVG6juijODJGyzZAGeR8eQK1GKAZbrvXHHCO0GTyie9Jqog7PHU22hhVhPOdrTLI_EQtVlriLAbcZyYzOoywW0zebWbFEyYE1RXA; SIDCC=AJi4QfFtaKBRgZuk0Gl336uz2hevn6eQwZen0JmHrYv9WOyRHHQy0of_s03etIHANMnOf-O-KQ; __Secure-3PSIDCC=AJi4QfFUCk3EaZs2DsaUuWlrpsZ0N5f4rqxgoWPUApuOhgZ22lGi_oa4FN6ESB7v6Nbekypz9A",
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
    `Bot Has Logged In And Is Playing Music! \nSimple Music Bot Is In ${client.guilds.cache.size} Servers! \n${client.users.cache.size} People Are Using Simple Music Bot! \nTotal Channels : ${client.channels.cache.size}!`
  );
  client.user.setActivity(`Simplicity | .help | Simply Simple Music Bot!`, {
    type: "LISTENING",
  });
  // client.user.setActivity(`Simplicity | Type .help | I Am in ${client.guilds.cache.size} Servers! & ${client.users.cache.size} People Are Using Me!`, { type: "LISTENING" });
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
