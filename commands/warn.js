const config = require("../config.json");

module.exports = async (client, msg) => {
  const channelWarn = await msg.guild.channels.cache.find(channel=>channel.id == config.channelWarnId);

  var message = msg.content.split(" ");
  message.splice(0, 1);
  message = message.join(" ");
  await channelWarn.send(`@everyone ${message}`);
  msg.reply(`Já foi dado o aviso no canal ${channelWarn} e isso me custou 2 dolares e 25 centavos`);
}