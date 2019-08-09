const Discord = require('discord.js');
const Keyv = require('keyv');
module.exports = {
	name: 'code',
	aliases: ['c', 'decode'],
	description: 'Beat the challenge and get something? Idk, but something will happen.',
	usage: 'command plus <number>',
	guildOnly: false,
	async execute(message, args) {
		const storage = new Keyv();
		storage.on('error', err => console.error('Keyv connection error:', err));

		var level = await storage.get('stage');
		var hint = '';
		var code = '';

		async function getNext() {
			const stage = await storage.get('stage');

			if (stage !== null && stage !== undefined) {
				switch (stage) {
					case 1:
						hint = 'Caesar fell down five stairs'
						code = 'HOH0DYZtHuZsDYDsHOHsDYZtHuDbHeZsIXVsHOZsHOZtDYZuHuZbHODsHODsDYDtHODsDYZuHeZsDYZtHeZtDYZsHuDsDYDuHeZbSB4bHYZrDYVsHYZrDYVsHYZrDYVsHYZbHYZrHNVrHOVsHYZrDYVsHYZbHYZrHOVsDYVsHYZrDYVsHYZrDYVsHYZrDYVsHYZrDYVsHYZ='
						break;
					case 2:

						break;
					case 3:

						break;
					case 4:

						break;
					default:
						break;
				}
			} else {
				storage.set('stage', 0);
				console.log('It has started');
				getNext();
			}
		};

		if (hint === '') {
			message.channel.send('Error');
			return;
		};

		const response = new Discord.RichEmbed()
			.setColor('#6b0c19')
			.setTitle(`Stage: ${stage}`)
			.addField(`Hint: ${hint}`, code, true)
			.setFooter('Good Luck.');

		message.channel.send(response);
	},
};
