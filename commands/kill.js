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
			const background = Canvas.loadImage('images/kill.jpg');
			// This uses the canvas dimensions to stretch the image onto the entire canvas
			ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
			// Use helpful Attachment class structure to process the file for you
			const attachment = new Discord.Attachment(canvas.toBuffer(), 'kill.png');

			channel.send(`Down ${member}!`, attachment);
			message.channel.send('Oh boy! Here I go killing again!')
		} else {
			message.channel.send('No user specified, going to kill everyone in their sleep now, thanks ' + message.member.displayName + '!')
		}
	},
};
