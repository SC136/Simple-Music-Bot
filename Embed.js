module.exports = function (MessageEmbed) {
    return new MessageEmbed()
    //.setThumbnail(client.user.avatarURL({ format: 'png', size: 1024, dynamic: true }))
    .setFooter('Simple Music Bot V3')
    .setColor('#2F3136')
    .setTimestamp();
};