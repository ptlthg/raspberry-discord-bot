const Canvas = require('canvas');
module.exports = {
	name: 'kill',
	description: 'Kill a user',
	execute(message, args) {
		let member = message.mentions.members.first();
		if (member !== undefined) {
			const { registerFont, createCanvas } = require('canvas');
			registerFont('fonts/Font-On-A-Stick.ttf', { family: 'Handwritten' });

			const canvas = createCanvas(500, 500);
			const ctx = canvas.getContext('2d');

			ctx.font = '12px "Handwritten"'
			ctx.fillText('Down ' + member.displayName, 250, 10)
			message.channel.send('Oh boy! Here I go killing again!')
		} else {
			message.channel.send('No user specified, going to kill everyone in their sleep now, thanks ' + message.member.displayName + '!')
		}
	},
};
