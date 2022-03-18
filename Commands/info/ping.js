const {MessageEmbed, Collection, Client, Discord, Permissions} = require('discord.js');
//name category and description of the bot aswell as it's usage
module.exports = {
    name: 'ping',
    category: 'info',
    description: '[ping] Returns latency and API ping',
    usage: '[name]',
 run : async(client, message, args, prefix) => {
     
    // the actual command
        const msg = await message.channel.send(`🏓 Pinging...`)
        const embed = new MessageEmbed()
            .setTitle('Pong!')
            .setDescription(`WebSocket ping is ${client.ws.ping}MS\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}MS!`)
            await message.channel.send({ embeds: [embed] })
            msg.delete()
    }  
    }
