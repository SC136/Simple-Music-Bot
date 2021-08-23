const { MessageEmbed } = require(`discord.js`);
module.exports = function (text) {
    return new MessageEmbed().setDescription(text).setColor(`#2F3136`);
};