const Discord = require('discord.js');
module.exports = {
	name: 'raspberry',
	description: 'Raspberry',
	execute(message, args) {
		const raspberry = new Discord.RichEmbed()
			.attachFiles(['commands/images/icon.png'])
			.setColor('red')
			.setAuthor('Raspberry', 'attachment://icon.png')
			.setImage('attachment://icon.png')
			.setTimestamp()
			.setFooter('Raspberry', 'attachment://icon.png');

		message.channel.send(raspberry);
	},
};
