const {MessageEmbed, Collection, Client, Discord, data, guild, Permissions} = require('discord.js');
const { readdirSync } = require('fs');
const moment = require('moment');
//name category and description of the bot aswell as it's usage
module.exports = {
    name: 'memberinfo',
    aliases: ['mi'],
    category: "info",
    description: "Shows info about selected user.",
    run: async(client, message, args, prefix) => {

        let member = message.mentions.members.last() || message.member;
        if(!member) {
            try { 
                member = await message.guild.members.fetch(args[0])
            } catch (err) {
                member = message.member;
            }
        }
        
        let rolesname;
        let roles = member.roles.cache.sort((a, b) => b.position - a.position).map
        (role => role.toString()).slice(0, -1);

        rolesname = roles.join(" ")
        if(member.roles.cache.size < 1) rolesname = "No Roles"
        if(!member.roles.cache.size || member.roles.cache.size - 1 < 1) roles =
        `\`None\``

        const embed = new MessageEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL({dynamic:
        true }))
        .setFooter(`ID: ${member.id}`)
        .setColor('RANDOM')
        .setDescription(`**USER:** \`${member.user.username}\` | \`#${member.user.discriminator}\`\n**ID:** \`${member.id}\`\n**Joined Discord at:** \`${moment(member.user.createdAt).format('MMMM DD YYYY, h:mm:ss')}\`\n**Joined Server At:**
        \`${moment(member.joinedAt).format('MMMM DD YYYY,h:mm:ss')} \`\n**Roles[${roles.length || '0'}]:** ${rolesname || `\` That user has no roles\``}`)

        message.channel.send({ embeds: [embed]})
    }}