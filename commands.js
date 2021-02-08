const downloadYT = require('ytdl-core');
const searchYT = require('yt-search');
const { Discord, MessageEmbed, Client, VoiceChannel } = require("discord.js");
const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');

async function play(msg, ...args) {

  if (!msg.member.voice.channel) {
    let errorEmbed = new MessageEmbed()
      .setDescription('You Need To Be In A Voice Channel To Play The Music!')
      .setFooter(`Requested By: ${msg.author.tag}`, msg.author.avatarURL({ "format": "png" }))
    return msg.channel.send(errorEmbed);
  }

  const Channel = msg.member.voice.channel;

  if (!Channel.joinable || !Channel.speakable) return msg.channel.send("I Dont Have Permission To Connect Or Speak In A VC!");

  if (!args.length) return msg.reply("Please Give A Song Name!");
  const vc = msg.member.voice.channel;
  const connection = await vc.join();
  const video = await findVideo(args.join(' '));

  if (video) {
    const stream = downloadYT(video.url, { filter: 'audioonly' });
    connection.play(stream, { seek: 0, volume: 1 });

    await msg.reply(`Now Playing \`${video.title}\`.`);
  } else
    await msg.reply(`You Need To Enter A Valid Song Name!`);
}
async function findVideo(query) {
  if (!query.length) return;
  const result = await searchYT(query);
  return (result.videos.length > 1)
    ? result.videos[0]
    : null;
}

async function stop(msg) {
  if (!msg.member.voice.channel) {
    let errorEmbed = new MessageEmbed()
      .setDescription('You Need To Be In A Voice Channel To Stop The Music!')
      .setFooter(`Requested by: ${msg.author.tag}`, msg.author.avatarURL({ "format": "png" }))
    return msg.channel.send(errorEmbed);
  }
  const vc = msg.member.voice.channel;
  await vc.leave();

  await msg.reply('Stopped.');
}
async function help(bot,msg) {
  const embed = new MessageEmbed()
  .setTitle('<:SimpleMusicBot:797533617042882612> Simple Music Bot Help Command')
  .setThumbnail(`${bot.user.displayAvatarURL()}`)
  .setDescription('So Simple!')
  .addField('.play', '```.play <songname> (Simply Plays A Song In The VC You Are In```', true)
  .addField('.stop', '```Simply Stops The Song```', true)
  .addField('.ping', '```Simply Shows You The Latency```', true)
  .addField('.server', '```Gives You The Support Server Invite Link```', true)
  .addField('.invite', '```Gives You The Link To Invite The Bot In Your Server```', true)
  .addField('.vote', '```Gives You A List Where You Can Vote The Bot!```', true)
  .addField('.uptime', '```Give You The Bot\'s Uptime!```', true)
  .addField('.botinfo', '```Give Some Info/Stats About The Bot```', true)
  .setFooter('If You Need Any Help Join The Support Server! Type `.server` To Get The Link!')
  await msg.reply(embed);
}
async function ping(msg) {
  await msg.channel.send(`🏓Latency Is ${Date.now() - msg.createdTimestamp}ms.`);
}
async function server(bot, msg) {
  const embed = new MessageEmbed()
    .setTitle('<:SimpleMusicBot:797533617042882612> Simple Music Bot Support Server Invite Link :')
    .setThumbnail(`${bot.user.displayAvatarURL()}`)
    .setDescription('Click [Here](https://discord.gg/Qysc2PXp5e) To Join The Support Server')
    .setColor("#2F3136")
  await msg.channel.send(embed);
}
async function servers(bot, msg) {
  const embed = new MessageEmbed()
    .setTitle('<:SimpleMusicBot:797533617042882612> Simple Music Bot')
    .setDescription('The Total Number Of \nDiscord Servers That The \nBot Is In')
    .setThumbnail(`${bot.user.displayAvatarURL()}`)
    .addField('Total Servers :', `\`\`\`${bot.guilds.cache.size}\`\`\``)
    .setColor("#2F3136")
    .setTimestamp()
  await msg.channel.send(embed);
}
async function users(bot, msg) {
  const embed = new MessageEmbed()
    .setTitle('<:SimpleMusicBot:797533617042882612> Simple Music Bot')
    .setDescription('The Total Number Of \nUsers That Are In The \nServers That The Bot Is In')
    .setThumbnail(`${bot.user.displayAvatarURL()}`)
    .addField('Total Users :', `\`\`\`${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\`\`\``)
    .setColor("#2F3136")
    .setTimestamp()
  await msg.channel.send(embed);
}
async function invite(bot, msg) {
  const invite = new MessageEmbed()
    .setTitle('<:SimpleMusicBot:797533617042882612> Simple Music Bot Invite Link :')
    .setDescription('[Click Here To Invite Simple Music Bot](https://discord.com/api/oauth2/authorize?client_id=780838708664467456&permissions=3147776&scope=bot)')
    .setThumbnail(`${bot.user.displayAvatarURL()}`)
    .setColor("#2F3136")
  await msg.channel.send(invite)
}
async function vote(bot, msg) {
  const vote = new MessageEmbed()
    .setDescription('If You Use Simple Music Bot & You Like It,\nThen Consider Voting The Bot In One Of These List!')
    .setThumbnail(`${bot.user.displayAvatarURL()}`)
    .setTitle('<:SimpleMusicBot:797533617042882612> You Can Vote Simple Music Bot Here In These Lists :')
    .addField('Top.gg', `[Vote!](https://top.gg/bot/780838708664467456/vote "Vote On Top.gg! (Recommended)") (Recommended)`)
    .addField('Discord Boats', `[Vote!](https://discord.boats/bot/780838708664467456/vote "Vote On Discord Boats!")`)
    .addField('Bots For Discord', `[Vote!](https://botsfordiscord.com/bot/780838708664467456/vote "Vote For Bots For Discord!")`)
    .addField('Discord Bot List', `[Vote!](https://discordbotlist.com/bots/simple-music-bot/upvote "Vote On Discord Bot List!")`)
    .setFooter('Tip : You Can Vote Daily!')
    .setColor("#2F3136")
  await msg.channel.send(vote)
}
async function uptime(msg) {
  const d = moment.duration(msg.client.uptime);
  const days = (d.days() == 1) ? `${d.days()} Day` : `${d.days()} Days`;
  const hours = (d.hours() == 1) ? `${d.hours()} Hour` : `${d.hours()} Hours`;
  const minutes = (d.minutes() == 1) ? `${d.minutes()} Minute` : `${d.minutes()} Minutes`;
  const seconds = (d.seconds() == 1) ? `${d.seconds()} Second` : `${d.seconds()} Seconds`;
  const date = moment().subtract(d, 'ms').format('dddd, MMMM Do YYYY');
  const embed = new MessageEmbed()
    .setTitle('<:SimpleMusicBot:797533617042882612> Simple Music Bot Uptime :')
    .setThumbnail('')
    .setDescription(`\`\`\`prolog\n${days}, ${hours}, ${minutes}, and ${seconds}\`\`\``)
    .addField('Date Launched :', date)
    .setFooter(msg.member.displayName, msg.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor("#2F3136")
    //.setColor(msg.guild.me.displayHexColor);
  await msg.channel.send(embed);
}
async function botinfo(bot, msg) {
  const { totalMemMb, usedMemMb } = await mem.info();
  const embed = new MessageEmbed()
  .setTitle('<:SimpleMusicBot:797533617042882612> Simple Music Bot\'s Info/Stats')
  .setThumbnail(`${bot.user.displayAvatarURL()}`)
  .setDescription('BotInfo Nothing More')
  .addField('Name :', `\`\`\`${bot.user.username}\`\`\``, true)
  .addField('Servers :', `\`\`\`${bot.guilds.cache.size}\`\`\``, true)
  .addField('Users :', `\`\`\`${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\`\`\``, true)
  .addField('Channels :', `\`\`\`${bot.channels.cache.size}\`\`\``, true)
  .addField('Emojis :', `\`\`\`${bot.emojis.cache.size}\`\`\``, true)
  .addField('Owner :', '```SC#0600```')
  .addField('Support Server Invite Link :', '```https://discord.gg/Qysc2PXp5e```')
  .addField('Stats', `\`\`\`Total Memory (RAM)    : ${totalMemMb} MB \nUsed Memory (RAM)     : ${usedMemMb} MB \nCPU Usage             : ${await cpu.usage()} \nCPU Model             : ${cpu.model()} \nCPU Cores             : ${cpu.count()} \nOS (Operating System) : ${await os.oos()}\`\`\``)
  .setColor("#2F3136")
  .setTimestamp()
  await msg.channel.send(embed)
}
module.exports.play = play;
module.exports.stop = stop;
module.exports.help = help;
module.exports.ping = ping;
module.exports.server = server;
module.exports.servers = servers;
module.exports.users = users;
module.exports.invite = invite;
module.exports.vote = vote;
module.exports.uptime = uptime;
module.exports.botinfo = botinfo;
