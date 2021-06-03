module.exports = {
    name: 'ping',
    run: async (c, message) => {
        message.channel.send(`🏓Latency Is ${Date.now() - message.createdTimestamp}ms.`)
    }
}