const downloadYT = require('ytdl-core');
const searchYT = require('yt-search');
const { Discord, Client } = require("discord.js");
const bot = new Client();
async function play(msg, ...args) {
    
          if (!msg.member.voice.channel) {
            let errorEmbed = new Discord.MessageEmbed()
                .setDescription('You Need To Be In A Voice Channel To Play The Music!')
            	.setFooter(`Requested By: ${msg.author.tag}`, msg.author.avatarURL({ "format": "png" }))
            return msg.channel.send(errorEmbed);
        }
  if (!args.length) return msg.reply("Please Give A Song Name!");
  const vc = msg.member.voice.channel;
  const connection = await vc.join();
  const video = await findVideo(args.join(' '));

  if (video) {
      const stream = downloadYT(video.url, {filter: 'audioonly'});
      connection.play(stream, { seek: 0, volume: 1 });

      await msg.reply(`Now playing \`${video.title}\`.`);
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
            let errorEmbed = new Discord.MessageEmbed()
                .setDescription('You Need To Be In A Voice Channel To Stop The Music!')
            	.setFooter(`Requested by: ${msg.author.tag}`, msg.author.avatarURL({ "format": "png" }))
            return msg.channel.send(errorEmbed);
        }
  const vc = msg.member.voice.channel;
  await vc.leave();

  await msg.reply('Stopped.');
}
async function help(msg) {
  await msg.reply('***Help Command*** \n\n`.help` (This Command) \n\n`.play <songname>` (Simply Plays A Song In The VC You Are In) \n\n`.stop` (Simply Stops The Song) \n\n`.ping` (Simply Shows You The Latency) \n\n`.server` (Gives You The Support Server Invite Link) \n\n`.invite` (Gives You The Link To Invite The Bot In Your Server) \n\nSo Simple! \n\n*If You Need Any Help Join The Support Server! Type `.server` To Get The Link!*');
}
async function ping(msg) {
  await msg.channel.send(`🏓Latency Is ${Date.now() - msg.createdTimestamp}ms.`);
}
async function server(msg) {
  const embed = new Discord.MessageEmbed()
  .setTitle('Simple Music Bot Support Server Invite Link :')
  .setDescription('Click [Here](https://discord.gg/Qysc2PXp5e) To Join The Support Server')
  await msg.channel.send(embed);
}
async function servers(msg) {
  await msg.channel.send(`**Simple Music Bot Total Servers :** ${this.bot.guilds.cache.size}`);
}
async function users(msg) {
  await msg.channel.send(`**Simple Music Bot Total Users :** ${this.bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}`);
}
async function invite(msg) {
  const invite = new Discord.MessageEmbed()
  .setTitle('Simple Music Bot Invite Link :')
  .setDescription('[Click Here To Invite Simple Music Bot](https://discord.com/api/oauth2/authorize?client_id=780838708664467456&permissions=3147776&scope=bot)')
  await msg.channel.send(invite)
}

module.exports.play = play;
module.exports.stop = stop;
module.exports.help = help;
module.exports.ping = ping;
module.exports.server = server;
module.exports.servers = servers;
module.exports.users = users;
module.exports.invite = invite;
