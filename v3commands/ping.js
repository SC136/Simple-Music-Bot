module.exports = {
    name: 'ping',
    description: 'Shows The WebSocket Ping!',
    run: async (client, message) => {
        message.reply({ embeds: [client.embed(`\`\`\`🏓 WebSocket Ping Is ${client.ws.ping}ms.\`\`\``)] });
    },
};