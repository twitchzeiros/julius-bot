module.exports = async (client, msg) => {
  const channel = msg.channel;
  const FetchMsg = await channel.messages.fetch();
  await channel.bulkDelete(FetchMsg, true);
  msg.reply("Tudo foi limpo, isso me custou 10 dolares")
}