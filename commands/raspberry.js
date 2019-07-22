const Discord = require('discord.js');
module.exports = {
	name: 'raspberry',
	aliases: ['r', 'vaarikas'],
	description: 'Raspberry',
	usage: 'raspberry',
	guildOnly: false,
	execute(message, args) {
		const raspberry = new Discord.RichEmbed()
			.attachFiles(['commands/images/icon.png'])
			.setColor('#6b0c19')
			.setAuthor('Raspberry', 'attachment://icon.png')
			.setImage('attachment://icon.png')
			.setFooter('Raspberry', 'attachment://icon.png');

		message.channel.send(raspberry);
	},
};
