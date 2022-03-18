const {MessageEmbed, Collection, Client, Discord, Permissions} = require('discord.js');


module.exports = {
    name: "unmute",
    category: "moderation",
    description: "un sillences a user",
    usage: "[name | member]",
    aliases: ["um"],

    run: async (client, message, args, prefix) => {

        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send("**You Do Not Have Permissions To Unmute Members! - [MANAGE_MESSAGES]**");
        if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return message.channel.send("**I Do Not Have Permissions To Manage Members! - [MANAGE_ROLES]**");

const member = message.mentions.members.first();
let target = message.guild.members.cache.get(member.id)
const role = message.guild.roles.cache.find(role => role.name === 'Muted')

target.roles.remove(role.id);
message.reply('Removed Role!')


} //Why do I put myself through pain?
}