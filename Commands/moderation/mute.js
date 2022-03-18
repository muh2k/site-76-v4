const {MessageEmbed, Collection, Client, Discord, data, guild, Permissions} = require('discord.js');
const cooldown = new Set();
const ms = require('ms');

module.exports = {
    name: "mute",
    category: "moderation",
    description: "this command allows you to sillence users",
    usage: "[name | member | time | reason]",
    aliases: ["m"],

    run: async (client, message, args, prefix) => {


        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send("**You Do Not Have Permissions To mute members! - [MANAGE_MESSAGES]**");
        if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return message.channel.send("**I Do Not Have Permissions To manage roles! - [MANAGE_ROLES]**");

const member = message.mentions.members.first();
let time = args[1];
const reason = args.slice(2).join(' ');
const role = message.guild.roles.cache.find(role => role.name === 'Muted')

const channelId = "889581003495067688"
const channel = member.guild.channels.cache.get(channelId);

if (!member) return message.reply('Mention a user!');
if (!time) return message.reply('Tell the time!');
if (!reason) return message.reply('Tell me a reason');

if (member.id === message.author.id) return message.reply('You cant mute your self!')
if (member.id === client.id) return message.reply('You cant mute me!')

if (!role) {
    try {
        message.channel.send('No muted role.. making one..!')
        let muterole = await message.guild.roles.create({
            data: {
                name: 'Muted',
                permissions: [],
            }
        });
        message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
            await channel.createOverwrite(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            })
        });
        message.channel.send(
            new MessageEmbed()
            .setDescription('Muted role has sucessfully been created')
            .setColor("GREEN")
        )
    } catch (error) {
        console.log(error)
    }
};
let role2 = message.guild.roles.cache.find(role => role.name === 'Muted')
if (member.roles.cache.has(role2)) return message.reply('User is already muted! ')

if (member.roles.highest.position >= message.member.roles.highest.position) return message.reply('You cant mute this user')
const log = new MessageEmbed()
.setTitle(`Success`)
.setDescription(`${message.author} Just muted ${member.user} for ${ms(ms(time))} with the reason ${reason}`)
.setColor('2E56B8')
.setImage('https://cdn.discordapp.com/emojis/872195846987460659.png?v=1')
.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
.setFooter(new Date().toLocaleString())

await member.roles.add(role2)
message.channel.send(`${member.user.username} has been muted for ${ms(ms(time))}, Reason: ${reason}`) && channel.send({ embeds: [log] });

setTimeout(() => {
    member.roles.remove(role2)
}, ms(time))

}



}