const Discord   = require('discord.js');
const client    = new Discord.Client();

const config    = require('./config.json');
const commands  = require('./scripts/commandsReader')(config.prefix);

const unknowCommand = require('./scripts/unknowCommand');

const permissions = config.permissions;

client.on("ready",()=>{
    console.log(`Logando com o bot ${client.user.tag}`);
});

client.on("message",(msg)=>{
    if(!msg.author.bot && msg.guild){
        if(config.debug) console.log(`${msg.author.username}: ${msg.content}`);
        const args = msg.content.split(" ");
        if(commands[args[0]]){
            if(verifyPermissions(msg.member,args[0]))
                commands[args[0]](client,msg);
            else msg.reply("");
        }else if(args[0].startsWith(config.prefix)) unknowCommand(client,msg);
    }
});

client.on("guildMemberAdd",(member)=>{
    const welcomeChannel = member.guild.channels.cache.find(channel=>channel.id == config.welcomeChannelId);
    welcomeChannel.send(`${member.user} qualquer coisa`);
    member.send("qualquer coisa");
});
client.on("guildMemberRemove",(member)=>{
    const welcomeChannel = member.guild.channels.cache.find(channel=>channel.id == config.welcomeChannelId);
    welcomeChannel.send(`${member.user} qualquer coisa`);
});

function verifyPermissions(member,command){
    let verification = !permissions[command];
    if(!verification){
        const perms = permissions[command];
        perms.forEach(p =>{
            switch(p.type){
                case "role":
                    if(member.roles.cache.has(p.value)) verification = true;
                break;
                case "permission":
                    if(member.permissions.has(p.value)) verification = true;
                break;
            }
        });
    }
    return verification;
}

client.login(config.token);