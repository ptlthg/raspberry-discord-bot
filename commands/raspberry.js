const Discord = require('discord.js');
module.exports = {
	name: 'test',
	description: 'test command',
	execute(message, args) {
		const raspberry = new Discord.RichEmbed()
			.setColor('red')
			.setAuthor('Raspberry')
			.attachFiles(['/commands/images/icon.png'])
			.setImage('attachment://icon.png')
			.setTimestamp()
			.setFooter('Raspberry');

		message.channel.send(raspberry);
	},
};
