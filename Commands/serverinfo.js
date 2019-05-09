    
const Discord = require("discord.js");
const moment = require('moment');

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On",  `${moment.utc(message.guild.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
    .addField("Owner", message.guild.owner )
    .addField("Total Members", message.guild.memberCount);

    message.channel.send(serverembed);
}

module.exports.help = {
  name:"serverinfo"
}


//.addField('Joined:',  `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)