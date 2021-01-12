const downloadYT = require('ytdl-core');
const searchYT = require('yt-search');
const { Discord, MessageEmbed } = require("discord.js");
async function play(msg, ...args) {
    
          if (!msg.member.voice.channel) {
            let errorEmbed = new Discord.MessageEmbed()
                .setDescription('You need to be in a voice channel to play music!')
            	.setFooter(`Requested by: ${msg.author.tag}`, msg.author.avatarURL({ "format": "png" }))
            return msg.channel.send(errorEmbed);
        }
  if (!args.length) return msg.reply("Please give a song name");
  const vc = msg.member.voice.channel;
  const connection = await vc.join();
  const video = await findVideo(args.join(' '));

  if (video) {
      const stream = downloadYT(video.url, {filter: 'audioonly'});
      connection.play(stream, { seek: 0, volume: 1 });

      await msg.reply(`Now playing \`${video.title}\`.`);
  } else
    await msg.reply(`You need to enter a song name!`);
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
                .setDescription('You need to be in a voice channel to stop music!')
            	.setFooter(`Requested by: ${msg.author.tag}`, msg.author.avatarURL({ "format": "png" }))
            return msg.channel.send(errorEmbed);
        }
  const vc = msg.member.voice.channel;
  await vc.leave();

  await msg.reply('Stopped.');
}
async function help(msg) {
  await msg.reply('***Help Command*** \n\n`.help` (This Command) \n\n`.play <songname>` (Simply Plays A Song In The VC You Are In) \n\n`.stop` (Simply Stops The Song) \n\n`.ping` (Simply Shows You The Latency) \n\n`.server` (Gives You The Support Server Invite Linl) \n\nSo Simple! \n\n*If You Need Any Help Join The Support Server! Type `.server` To Get The Link!*');
}
async function ping(msg) {
  await msg.channel.send(`🏓Latency Is ${Date.now() - msg.createdTimestamp}ms.`);
}
async function server(msg) {
  const embed = new MessageEmbed()
  .setTitle('Simple Music Bot Support Server Invite Link :')
  .setDescription('[Click Here To Join SC Bot Support Server](https://discord.gg/Qysc2PXp5e)')
  await msg.channel.send(embed);
}
async function servers(msg) {
  await msg.channel.send(`**Simple Music Bot Total Servers :** ${bot.guilds.cache.size}`);
}
async function users(msg) {
  await msg.channel.send(`**Simple Music Bot Total Users :** ${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}`);
}

module.exports.play = play;
module.exports.stop = stop;
module.exports.help = help;
module.exports.ping = ping;
module.exports.server = server;
module.exports.servers = servers;
module.exports.users = users;
