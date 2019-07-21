const Canvas = require('canvas');
const Discord = require('discord.js');
module.exports = {
	name: 'kill',
	description: 'Kill a user',
	execute(message, args) {
		let member = message.mentions.members.first();
		if (member !== undefined) {
			async function kill() {
				const { registerFont, createCanvas } = require('canvas');
				registerFont('commands/fonts/Font-On-A-Stick.ttf', { family: 'Handwritten' });

				const canvas = createCanvas(500, 500);
				const ctx = canvas.getContext('2d');
				ctx.font = '64px "Handwritten"';
				ctx.strokeStyle = '#6b0c19';
				const background = await Canvas.loadImage('commands/images/kill.jpg');

				ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
				if (ctx.measureText(member.displayName.toUpperCase()).width > canvas.width - 50) {
					var fontsize = 64;
					do {
						fontsize--;
						ctx.font=fontsize + 'px ' + 'Handwritten';
					} while (ctx.measureText(member.displayName.toUpperCase()).width > canvas.width - 50)
				} else {
					ctx.fillText('DOWN ' + member.displayName.toUpperCase(), 25, canvas.height / 4)
				};

				//const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
				//ctx.drawImage(avatar, 25, 0, 200, 200);

				const attachment = new Discord.Attachment(canvas.toBuffer(), 'kill.png');

				message.channel.send(`Down ${member}!`, attachment);
				message.channel.send('Oh boy! Here I go killing again!')
			}
			kill()
		} else {
			message.channel.send('No user specified, going to kill everyone in their sleep now, thanks ' + message.member.displayName + '!')
		}
	},
};
