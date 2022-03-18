const {MessageEmbed, Collection, Client, Discord, Permissions} = require('discord.js');

module.exports = {
    name: "kick",
    category: "moderation",
    description: "Kicks the user",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
    aliases: ["k"],
        run: async (client, message, args, prefix) => {
            if (!message.member.permissions.has(Permissions.FLAGS.PRIORITY_SPEAKER)) return message.channel.send("**You Do Not Have The Secret! - [PRIORITY_SPEAKER]**");
            if (!message.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.channel.send("**I Do Not Have Permissions To Kick Members! - [KICK_MEMBERS]**");

        try {
  

            var reason = args.slice(1).join(" ");

            const logChannel = user.guild.channels.find(ch => ch.name.includes('mod-log'));
            const kickMessage = new MessageEmbed()
            .setColor("RED")
            .setDescription(`**${message.guild.name} Just got absolutely booted for - ${reason || "No Reason!"} By ${message.Author}**`)
            .setFooter(message.guild.name, message.guild.iconURL())


            if (!args[0]) return message.channel.send('**Enter A User To Kick!**')

            var kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!kickMember) return message.channel.send("**User Is Not In The Guild!**");

            if (kickMember.id === message.member.id) return message.channel.send("**You Cannot Kick Yourself!**")

            if (!kickMember.kickable) return message.channel.send("**Cannot Kick This User!**")
            if (kickMember.user.bot) return message.channel.send("**Cannot Kick A Bot!**")



            try {
                const embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`**Hello, You Have Been Kicked From ${message.guild.name} for - ${reason || "No Reason!"}**`)
                    .setFooter(message.guild.name, message.guild.iconURL())
                kickMember.send({ embeds: [embed] }).then(() =>
                    kickMember.kick()).catch(() => null)
            } catch {
                kickMember.kick()
            }
            if (reason) {
            const embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`**${kickMember.user.username}** Has Been Kicked For ${reason}`)
            message.channel.send({ embeds: [embed2] });
            } else {
                const embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`**${kickMember.user.username}** Has Been Kicked For No Reason`)
            message.channel.send({ embeds: [embed3] });
            }
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
}
