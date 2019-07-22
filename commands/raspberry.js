const Discord = require('discord.js');
module.exports = {
	name: 'raspberry',
	description: 'Raspberry',
	execute(message, args) {
		const raspberry = new Discord.RichEmbed()
			.attachFiles(['commands/images/icon.png'])
			.setColor('red')
			.setAuthor('Raspberry', 'commands/images/icon.png')
			.setImage('attachment://icon.png')
			.setTimestamp()
			.setFooter('Raspberry', 'commands/images/icon.png');

		message.channel.send(raspberry);
	},
};
