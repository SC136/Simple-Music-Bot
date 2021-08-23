const { MessageEmbed } = require(`discord.js`);
module.exports = function (message, error) {
    const embed = new MessageEmbed().setDescription(`\`\`\`❌ ${error}\`\`\``).setColor(`#2F3136`);
    return message.reply({ embeds: [embed] });
};