const { MessageEmbed } = require('discord.js')
const { readdirSync } = require('fs')

module.exports = {
    name: 'help',
    aliases: ['h'],
    description: "Shows all available bot commands.",
    run: async(client, message, args, prefix) => {
        if(!args[0]) {
            let categories = [];

            readdirSync("./Commands/").forEach((dir) => {
                const commands = readdirSync(`./Commands/${dir}/`).filter((file) => file.endsWith(".js"))
            
            const cmds = commands.map((command) => {
                let file = require(`../../Commands/${dir}/${command}`)
                if(!file.name) return "No command name.";

                let name = file.name.replace(".js", "");

                return `\`${name}\``;
            });

            let data = new Object();
            data = {
                name: dir.toUpperCase(),
                value: cmds.lenght === 0 ? "In progress." : cmds.join(" | "),
            };
            categories.push(data);
            })

            const embed = new MessageEmbed()
            .setTitle("Commands")
            .addFields(categories)
            .setDescription(`Use \`-help\` followed by a command name to get more additional information on a command. for example: \`-help ping\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setColor(message.guild.me.displayHexColor);
            return message.channel.send({ embeds: [embed] })
        } else {
            const command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));

            if(!command) {
                const embed = new MessageEmbed()
                .setTitle('Not Found')
                .setDescription(`Command not found, Use \`-help\` for all commands available`)
                .setColor(message.guild.me.displayHexColor);
                return message.channel.send({ embeds: [embed]})
            }
            const embed = new MessageEmbed()
            .setTitle("Command Details")
            .addField("COMMAND:",
            command.name ? `\`${command.name}\`` : "No name for this command"
            )
            .addField("ALIASES:",
            command.aliases ? `\`${command.aliases.join("` `")}\`` : "No aliases for this command."
            )
            .addField("USAGE:",
            command.usage ? `\`-${command.name} ${command.usage}\`` : `\`-${command.name}\``
            )
            .addField("DESCRIPTION", command.description ? command.description : "No description for this command."
            )
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true}))
            .setColor(message.guild.me.displayHexColor);
            return message.channel.send({ embeds: [embed]});
        }
    }
}