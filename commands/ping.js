module.exports = {
    name: 'ping',
    run: async (message) => {
        message.channel.send(`🏓Latency Is ${Date.now() - msg.createdTimestamp}ms.`)
    }
}