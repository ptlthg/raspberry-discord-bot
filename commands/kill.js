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
				var textWidth = ctx.measureText(member.displayName.toUpperCase()).width

				function fitText(text, fontface) {
					var fontsize = 128;
					do {
						fontsize--;
						ctx.font = fontsize + 'px ' + fontface;
					} while (ctx.measureText(text).width > canvas.width - 100)
					ctx.fillText(text, 50, canvas.height /4)
				}
				if (textWidth > canvas.width - 100) {
					fitText('DOWN ' + member.displayName.toUpperCase(), 'Handwritten')
				} else {
					ctx.fillText('DOWN ' + member.displayName.toUpperCase(), 50, canvas.height / 4)
				};

				//const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
				//ctx.drawImage(avatar, 25, 0, 200, 200);

				const attachment = new Discord.Attachment(canvas.toBuffer(), 'kill.png');

				const embed = new Discord.RichEmbed()
					.image(attachment)
					.setFooter('Oh boy! Here I go killing again!')
				message.channel.send(embed)
			}
			kill()
		} else {
			message.channel.send('No user specified, going to kill everyone in their sleep now, thanks ' + message.member.displayName + '!')
		}
	},
};
