module.exports = function (MessageEmbed) {
    return new MessageEmbed()
        .setTitle('Error!')
        //.setThumbnail(client.user.avatarURL({ format: 'png', size: 1024, dynamic: true }))
        .setFooter('Error!')
        .setColor('#2F3136')
        .setTimestamp();
};