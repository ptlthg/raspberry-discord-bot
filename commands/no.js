const Canvas = require('canvas');
const Discord = require('discord.js');
module.exports = {
	name: 'no',
	description: 'Chuck \"no\" at someone.',
	execute(message, args) {
		var member = message.mentions.members.first();
		if (member !== undefined) {
			kill(member, true)
		} else {
			message.channel.send('No user specified, going to kill everyone in their sleep now, thanks ' + message.member.displayName + '!')
		}
		async function kill(victim, state) {
			member = victim;

			const { registerFont, createCanvas } = require('canvas');
			registerFont('commands/fonts/Font-On-A-Stick.ttf', { family: 'Handwritten' });

			const background = await Canvas.loadImage('commands/images/no.png');
			const canvas = createCanvas(background.width, background.height);
			const ctx = canvas.getContext('2d');

			ctx.font = '64px "Handwritten"';
			ctx.fillStyle = '#6b0c19';

			ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

			var name = member.displayName.toUpperCase();
			var noWidth = ctx.measureText(name + ' NO').width;

			function fitText(text, size, fontface, fontsize, xPos, yPos) {
				do {
					fontsize--;
					ctx.font = fontsize + 'px ' + fontface;
				} while (ctx.measureText(text).width > size);
				ctx.fillText(text, xPos, yPos);
			}
			if (noWidth > canvas.width - 100) {
				fitText(name + ' NO', canvas.width / 1.5 - 100, 'Handwritten', 128, 30, canvas.height / 4);
			} else {
				ctx.fillText(name + ' NO', 30, canvas.height / 4);
			};

			ctx.beginPath();
			ctx.arc(canvas.width, 100, 100, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.clip();

			const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
			ctx.drawImage(avatar, canvas.width - 100, 0, 200, 200);

			const attachment = new Discord.Attachment(canvas.toBuffer(), 'kill.png');

			const newEmbed = new Discord.RichEmbed()
				.setColor('#6b0c19')
				.setAuthor('Oh boy! Here I go killing again!')
				.attachFiles([attachment])
				.setImage('attachment://kill.png')
				.setTimestamp()
				.setFooter(message.member.displayName + ' made me do it.');

			message.channel.send(newEmbed);
		}
	},
};
