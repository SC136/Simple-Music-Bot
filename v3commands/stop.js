module.exports = {
  name: "stop",
  run: (client, message) => {
    let queue = client.player.getQueue(message.guild.id);
    if (!message.member.voice.channelId)
      return client.error(message, `You Need To Join A VC!`);
    if (
      message.guild.me.voice.channelId &&
      message.member.voice.channelId !== message.guild.me.voice.channelId
    )
      return client.error(message, `You Are Not In The Same VC As Me!`);
    if (!queue)
      return client.error(message, `There Is No Music Playing In This Server!`);
    queue.destroy();
    // message.reply({ embeds: [client.embed('```The Song Has Been Stopped & The Queue Has Been Destroyed```')] });
  },
};
