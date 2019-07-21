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

				const background = await Canvas.loadImage('commands/images/kill.jpg');
				const canvas = createCanvas(background.width, background.height);
				const ctx = canvas.getContext('2d');

				ctx.font = '128px "Handwritten"';
				ctx.fillStyle = '#6b0c19';

				ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
				console.log(ctx.measureText(member.displayName.toUpperCase()).width + (ctx.measureText(member.displayName.toUpperCase()).width / 2))
				console.log(canvas.width + ',' + canvas.height)
				const textWidth = ctx.measureText(member.displayName.toUpperCase()).width
				if (textWidth > canvas.width - 50) {
					var fontsize = 128;
					do {
						fontsize = fontsize - 1;
						ctx.font = fontsize + 'px "Handwritten"';
						console.log(textWidth)
						console.log(canvas.width - 100)
					} while (textWidth > (canvas.width - 100));
					console.log(textWidth)
					console.log(canvas.width - 100)
					ctx.fillText('DOWN ' + member.displayName.toUpperCase(), 50, canvas.height / 4)
				} else {
					ctx.fillText('DOWN ' + member.displayName.toUpperCase(), 50, canvas.height / 4)
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
