const Discord = require("discord.js");
const OWNER_ID = require("../../config.json").OWNER_ID;
require("dotenv");

module.exports = {
  name: "botservers",
  category: "OwnerOnly",
  description: "Check what Servers the bot is in!",
  aliases: ["bs"],
  run: async (client, message, args) => {
    try {
      if (message.author.id != OWNER_ID)
        return message.channel.send(
          `<:heelp:872195846987460659> Developer Only <:heelp:872195846987460659>`
        );
      let data = [];
      client.guilds.cache.forEach((x) => {
        message.channel.send(
          `🔹**${x.name}** | \`${x.memberCount}\` members (ID: ${x.id})\n............................`
        );
      });

      if (data.length > 0) {
        data.sort();
        data = `🔹 ` + data.join("\n🔹");
      } else {
        data = "[No server found]";
      }
    } catch (err) {

      message.channel.send(
        `Whoops, We got a error right now! This error has been reported to Support center!`
      );


    }
  },
};