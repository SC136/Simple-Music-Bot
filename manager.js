const { Manager } = require("erela.js");
const { MessageEmbed } = require('discord.js');

module.exports = function (client) {
    return new Manager({
        nodes: [{
            host: "lava.link",
            port: 80,
            password: 'anypass',
            retryDelay: 5000,
        }],
        autoPlay: true,
        send: (id, payload) => {
            const guild = client.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
        }
    })
        .on("nodeConnect", node => console.log(`Node "${node.options.identifier}" connected.`))
        .on("nodeError", (node, error) => console.log(
            `Node "${node.options.identifier}" Encountered An Error : ${error.message}.`
        ))
        .on("trackStart", (player, track) => {
            const channel = client.channels.cache.get(player.textChannel);
            channel.send(
                new MessageEmbed()
                    .setTitle('Now Playing...')
                    .setDescription(`\`\`\`prolog\n${track.title}\`\`\``)
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setColor('#2F3136')
                    .setTimestamp()
            );
        })
        .on("trackEnd", (player) => {
            const channel = client.channels.cache.get(player.textChannel);
            channel.send(`**The Current Track Has Ended**`);
        })
        .on("queueEnd", player => {
            const channel = client.channels.cache.get(player.textChannel);
            channel.send("Queue has ended.");
            player.destroy();
        });
};

//`Now playing: \`${track.title}\`, requested by \`${track.requester.tag}\`.`