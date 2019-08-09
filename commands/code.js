const Discord = require('discord.js');
module.exports = {
	name: 'code',
	aliases: ['c', 'decode'],
	description: 'Beat the challenge and get something? Idk, but something will happen.',
	usage: 'command plus <number>',
	guildOnly: false,
	execute(message, args) {
		

		const response = new Discord.RichEmbed()
			.setColor('#6b0c19')
			.setTitle(`Stage: ${stage}`)
			.addField(`Hint: ${hint}`, code, true)
			.setFooter('Good Luck.');

		message.channel.send(response);
	},
};
