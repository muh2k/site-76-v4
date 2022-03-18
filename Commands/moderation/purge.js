const {MessageEmbed, Collection, Client, Discord, Permissions} = require('discord.js');

// name category and description of the bot aswell as it's usage
module.exports = {
    name: "purge",
    category: "moderation",
    description: "purges a number of messages",
    usage: "[name | number]",
    aliases: ["p"],

    run: async (client, message, args, prefix) => {
  
//permissions of the bot and user required
        if (!message.member.permissions.has(Permissions.FLAGS.PRIORITY_SPEAKER)) return message.channel.send("**You Do Not Have The Secret! - [PRIORITY_SPEAKER]**");
        if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send("**I Do Not Have Permissions To Kick Members! - [MANAGE_MESSAGES]**");
        try {
        if(!message.content.startsWith(prefix)) return;
// delete the initial message
        if (message.deletable) {
            message.delete();
        }
    //defining variables

        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("This is not a number").then(m => m.delete(5000));
        }
    
        let deleteAmount;
        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }
    
        message.channel.bulkDelete(deleteAmount, true)
  // error handler
    } catch (e) {
        return message.channel.send(`**${e.message}**`)

    }



}}