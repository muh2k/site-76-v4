const client = require('../index.js');
const { PREFIX } = require('../config.json');
const { MessageEmbed } = require('discord.js');

client.on('messageCreate', async message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(PREFIX)) return;
  if(!message.guild) return;
  if(!message.member) message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if(cmd.length == 0) return;
  let command = client.commands.get(cmd)
  if(!command) command = client.commands.get(client.aliases.get(cmd));
  if(command) command.run(client, message, args)

 /*   if(message.content === `<@${client.user.id}>` || message.content === `<@!?${client.user.id}>`) {
    const embed = new MessageEmbed()
    .setTitle('Need help?')
    .setDescription('My prefix is -, for my commands type help')
    .setColor('RANDOM')
    message.channel.send({ embeds: [embed] })
  }*/
})