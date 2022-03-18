const {MessageEmbed, Collection, Client, Discord, Permissions} = require('discord.js');

module.exports = {
    name: 'ping',
    category: 'info',
    description: '[ping] Returns latency and API ping',
    usage: '[name]',
 run : async(client, message, args, prefix) => {
        if (!message.member.permissions.has(Permissions.FLAGS.PRIORITY_SPEAKER)) return message.channel.send("**You Do Not Have The Secret! - [PRIORIY_SPEAKER]**");



        const msg = await message.channel.send(`🏓 Pinging...`)
        const embed = new MessageEmbed()
            .setTitle('Pong!')
            .setDescription(`WebSocket ping is ${client.ws.ping}MS\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}MS!`)
            await message.channel.send({ embeds: [embed] })
            msg.delete()
    }  
    }
