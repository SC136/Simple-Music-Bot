module.exports = {
    name: 'ping',
    run: async (message) => {
        message.channel.send(`🏓Latency Is ${Date.now() - message.createdTimestamp}ms.`)
    }
}