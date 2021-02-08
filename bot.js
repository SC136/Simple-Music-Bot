const { Client, VoiceState } = require('discord.js');
const { play, stop, help, ping, server, servers, users, invite, vote, uptime, botinfo} = require('./commands');
const AutoPoster = require('topgg-autoposter')

const bot = new Client();

const ap = AutoPoster('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc4MDgzODcwODY2NDQ2NzQ1NiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjEwODY5MjI5fQ.JSpTq_AuZQGJai_C61sP8QWziyUmspNjmwgfGnIogao', bot) // your discord.js or eris client

bot.login('NzgwODM4NzA4NjY0NDY3NDU2.X706tw.ffi28PFilfRlL-vu1XyFQt1ZzOw');

bot.on('ready', () => {
  console.log(`Bot Has Logged in And Is Playing Music! \nSimple Music Bot Is In ${bot.guilds.cache.size} Servers! \n${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} People Are Using Simple Music Bot! \nTotal Channels : ${bot.channels.cache.size}!`);
  bot.user.setActivity(`Simplicity | Type .help | I Am In ${bot.guilds.cache.size} Servers! & ${bot.users.cache.size} People Are Using Me!`, { type: "LISTENING" });

});

ap.on('posted', () => { // ran when succesfully posted
  console.log('Posted Stats to Top.gg')
})

bot.on('message', (msg) => {
    if (msg.author.bot) return;

    const prefix = '.';
    if (!msg.content.startsWith(prefix)) return;

    const commandName = getCommandName(prefix, msg.content);
    const args = getCommandArgs(prefix, msg.content);

    if (commandName === 'play')
      return play(msg, args);
    else if  (commandName === 'stop')
      return stop(msg, args);
    else if  (commandName === 'help')
      return help(msg, args); 
    else if  (commandName === 'ping')
      return ping(msg, args);
    else if  (commandName === 'server')
      return server(msg, args);
    else if  (commandName === 'servers')
      return servers(bot, msg, args);
    else if (commandName === 'users')
      return users(bot, msg, args);
    else if (commandName === 'invite')
      return invite(msg, args);
    else if (commandName === 'vote')
      return vote(msg, args);
    else if (commandName === 'uptime')
      return uptime(msg, args);
    else if (commandName === 'botinfo')
      return botinfo(bot, msg);
});

function getCommandName(prefix, content) {
    return content 
    .slice(prefix.length)
    .split(' ')[0];
}
function getCommandArgs(prefix, content) {
    return content
      .slice(prefix.length)
      .split(' ')
      .slice(1);
}
