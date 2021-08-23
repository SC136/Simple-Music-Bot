const client = require(`./v3`)
module.exports = (message) => {
	if (!message.member.voice.channelId) return client.error(message, `You Need To Join A VC!`);
	if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return client.error(message, `You Are Not In The Same VC As Me!`);
	if (!client.player.getQueue(message.guild.id)) return client.error(message, `There Is No Music Playing In This Server!`);
};