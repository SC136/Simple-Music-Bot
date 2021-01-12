const { Client } = require('discord.js');
const { play, stop, help, ping, server, servers, users} = require('./commands');

const bot = new Client();

bot.login('NzgwODM4NzA4NjY0NDY3NDU2.X706tw.ffi28PFilfRlL-vu1XyFQt1ZzOw');

bot.on('ready', () => {
  console.log('Bot Has Logged in And Is Playing Music!');
  bot.user.setActivity("Simplicity | Type .help", { type: "LISTENING" });

});

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
      return servers(msg, args);
    else if (commandName === 'users')
      return users(msg, args);
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
