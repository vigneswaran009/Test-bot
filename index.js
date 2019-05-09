const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const moment = require('moment');
const client = new Discord.Client();

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

bot.on("ready", function(){
  var Count;
  for(Count in bot.users.array()){
     var User = bot.users.array()[Count];
     console.log(User.username);
  }

})


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("Nothing", {type: "WATCHING"});
  console.log("Bot online!");
  // const guild = client.guilds.get("559009647160328202");
  // const role = guild.roles.find("name", "Member");
  

});

  




//new Method . Yeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeet
//https://www.youtube.com/watch?v=Bts7kbZuefQ

// bot.on("guildMemberAdd", function(member){
//   //const guild = client.guilds.get("The_server_id");
    
// let memberRole = member.guild.roles.find(role => role.name ==="Member");
// member.addRole(memberRole);

// });

  
// client.on('message', message => {
  
//   const gRole = message.guild.roles.find(role => role.name === 'Member');
//   const member = message.mentions.members.first();
//   if (message.content === 'addRole') {
//       member.addRole(gRole);
//   }
// });



bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  if(message.content == "Join"){
    message.member.send("Welcome to the Server");

    let memberRole = message.guild.role.find("name", "Member");
    message.member.addRole(memberRole);

  }

//   if(cmd === `${prefix}userinfo`){

//     let member = message.mentions.members.first() || message.member,
// user = member.user;
// let embed = new Discord.RichEmbed()
// .setAuthor(user.username + '#' + user.discriminator, user.displayAvatarURL)
//     .setDescription(`${user}`)
//     .setColor(`RANDOM`)
//     .setThumbnail(`${user.displayAvatarURL}`)
//     .addField('Status:', user.presence.status, true)
//     .addField('Joined:',  `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
//     //.addField('Joined :' `${moment(message.member.joinedAt).format('lll') + '\n*' + moment(new Date()).diff(message.member.joinedAt, 'days') + ' days ago*'}`, true)
//     .addField('Roles:', member.roles.map(r => `${r}`).join('\n'), true)
//     .addBlankField(true)
//     .setFooter(`ID: ${user.id}`)
//     .setTimestamp();
    
//     return message.channel.send(embed);
// }



if(cmd === `${prefix}userinfo`){

    let member = message.mentions.members.first() || message.member,
user = member.user;
let embed = new Discord.RichEmbed()
.setAuthor(user.username + '#' + user.discriminator, user.displayAvatarURL)
    .setDescription(`${user}`)
    .setColor(`RANDOM`)
    .setThumbnail(`${user.displayAvatarURL}`)
    .addField('Status:', user.presence.status, true)
    .addField('Joined:',  `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
    //.addField('Joined :' `${moment(message.member.joinedAt).format('lll') + '\n*' + moment(new Date()).diff(message.member.joinedAt, 'days') + ' days ago*'}`, true)
    .addField('Roles:', member.roles.map(r => `${r}`).join('\n'), true)
    .addBlankField(true)
    .setFooter(`ID: ${user.id}`)
    .setTimestamp();
    
    return message.channel.send(embed);
}
if(cmd === `${prefix}1800+`) {
  const ListEmbed = new Discord.RichEmbed()
      .setTitle('Users with the 1800+ role:')
      .setDescription(message.guild.roles.get('574341428445184010').members.map(m=>m.user.tag).join('\n'));
  return message.channel.send(ListEmbed);  

}



});

bot.login(tokenfile.token);
