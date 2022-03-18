const {MessageEmbed, Collection, Client, Discord, Permissions} = require('discord.js');
const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
const OWNER_ID = require("../../config.json").OWNER_ID;

//name category and description of the bot aswell as it's usage
module.exports = {
        name: "botinfo",
        category: "OwnerOnly",
        description: "[Botinfo] Shows The Bots Statistics",
        usage: "[Name]",
        run: async (client, message, args, prefix) => {
         // only allowing the owner to access the command
          if (message.author.id != OWNER_ID) 
          return message.channel.send(
            `<:heelp:872195846987460659> Developer Only <:heelp:872195846987460659>`
          );

//defining everything in the embed do not change
        const d = moment.duration(message.client.uptime);
        const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
        const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
        const clientStats = stripIndent`
          Servers   :: ${message.client.guilds.cache.size}
          Users     :: ${message.client.users.cache.size}
          Channels  :: ${message.client.channels.cache.size}
          WS Ping   :: ${Math.round(message.client.ws.ping)}ms
          Uptime    :: ${days} and ${hours}
          Prefix    :: -
       `;
        const { totalMemMb, usedMemMb } = await mem.info();
        const serverStats = stripIndent`
          OS        :: ${await os.oos()}
          Cores     :: ${cpu.count()}
          CPU Usage :: ${await cpu.usage()} %
          RAM       :: ${totalMemMb} MB
          RAM Usage :: ${usedMemMb} MB
        `;
    //the actual embed
        const embed = new MessageEmbed()
        .setTitle('Bot\'s Statistics')
        .addField('Commands', `\`${message.client.commands.size}\` commands`, true)
        .addField('Aliases', `\`${message.client.aliases.size}\` aliases`, true)
        .addField('Client', `\`\`\`asciidoc\n${clientStats}\`\`\``)
        .addField('Server', `\`\`\`asciidoc\n${serverStats}\`\`\``)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
        //sending the embed
        message.channel.send({ embeds: [embed] });


     }
}
