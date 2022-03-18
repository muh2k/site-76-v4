const {MessageEmbed, Collection, Client, Discord, Permissions} = require('discord.js');
//name category and description of the bot aswell as it's usage
module.exports = {
    name: "ban",
    category: "moderation",
    description: "bans the user",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
    aliases: ["b"],
        run: async (client, message, args, prefix) => {


        try {
            // the permissions required for the bot and user to execute this command
            if (!message.member.permissions.has(Permissions.FLAGS.PRIORITY_SPEAKER)) return message.channel.send("**You Do Not Have The Secret! - [PRIORITY_SPEAKER]**");
            if (!message.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.channel.send("**I Do Not Have Permissions To Kick Members! - [BAN_MEMBERS]**");

            var reason = args.slice(1).join(" ");



      // finding the user 
            if (!args[0]) return message.channel.send('**Enter A User To Ban!**')

            var banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!banMember) return message.channel.send("**User Is Not In The Guild!**");

            if (banMember.id === message.member.id) return message.channel.send("**You Cannot ban Yourself!**")

            if (!banMember.bannable) return message.channel.send("**Cannot ban This User!**")
            if (banMember.user.bot) return message.channel.send("**Cannot ban A Bot!**")



            try {
                const embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`**Hello, You Have Been banned From ${message.guild.name} for - ${reason || "No Reason!"}**`)
                    .setFooter(message.guild.name, message.guild.iconURL())
                banMember.send({ embeds: [embed] }).then(() =>
                    banMember.ban()).catch(() => null)
            } catch {
                //banning the member
                banMember.ban()
            }
            if (reason) {
            const embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`**${banMember.user.username}** Has Been banned For ${reason}`)
            message.channel.send({ embeds: [embed2] });
            } else {
                const embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`**${banMember.user.username}** Has Been banned For No Reason`)
            message.channel.send({ embeds: [embed3] });
            }
        // error handling
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
}
// from here on out don't expect much comments they are goanna be lacking due to me being to tired to care