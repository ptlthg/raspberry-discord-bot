const Discord = require('discord.js');
module.exports = {
	name: 'raspberry',
	description: 'Raspberry',
	args: false,
	usage: 'raspberry',
	guildOnly: false,
	execute(message, args) {
		const raspberry = new Discord.RichEmbed()
			.attachFiles(['commands/images/icon.png'])
			.setColor('red')
			.setAuthor('Raspberry', 'attachment://icon.png')
			.setImage('attachment://icon.png')
			.setFooter('Raspberry', 'attachment://icon.png');

		message.channel.send(raspberry);
	},
};
