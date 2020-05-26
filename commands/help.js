const config = require('../config.json');
const commands = require('../scripts/commandsReader')(config.prefix);

const descriptions = {
  "!help": "Peça ajuda para saber os comandos, isso vai me custar 0,50 centavos",
  "!test": "Teste o bot, isso vai me custar 1,00 dolar"
};
const permissions = config.permissions;

module.exports = async (client, msg) => {
  var text = "Comandos:";
  Object.keys(commands).forEach(command => {
    if(verifyPermissions(msg.member, command))
      text += `\n ${command}: ${descriptions[command] ? descriptions[command] : 'Não existe uma descrição'}`
  });
  msg.reply(text);
}

function verifyPermissions(member, command) {
  let verification = !permissions[command];
  if(!verification) {
    const perms = permissions[command];
    perms.forEach(p => {
      switch(p.type){
        case "role":
          if(member.role.cache.has(p.value))
          verification = true;
        break;
        case "permission": 
          if(member.permissions.has(p.value))
          verification = true;
        break; 
      }
    })
  }
  return verification;
}