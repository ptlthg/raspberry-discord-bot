const Canvas = require('canvas');
const Discord = require('discord.js');
module.exports = {
	name: 'kill',
	description: 'Kill a user',
	execute(message, args) {
		var member = message.mentions.members.first();
		if (member !== undefined) {
			kill(member, true);
		} else if (args !== undefined && args !== '' && args !== ' ') {
			kill(args, false);
		} else {
			message.channel.send('No user specified, going to kill everyone in their sleep now, thanks ' + message.member.displayName + '!');
		};
		async function kill(victim, state) {
			member = victim;

			const { registerFont, createCanvas } = require('canvas');
			registerFont('commands/fonts/Font-On-A-Stick.ttf', { family: 'Handwritten' });

			const background = await Canvas.loadImage('commands/images/kill.jpg');
			const canvas = createCanvas(background.width, background.height);
			const ctx = canvas.getContext('2d');

			ctx.font = '128px "Handwritten"';
			ctx.fillStyle = '#6b0c19';

			ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
			if (state) {
				var name = member.displayName.toUpperCase();
			} else {
				var name = member.toString().toUpperCase();
			};

			var downWidth = ctx.measureText('DOWN ' + name).width;
			var nameWidth = ctx.measureText(name).width;

			function fitText(text, size, fontface, fontsize, xPos, yPos) {
				do {
					fontsize--;
					ctx.font = fontsize + 'px ' + fontface;
				} while (ctx.measureText(text).width > size);
				ctx.fillText(text, xPos, yPos);
			}
			if (downWidth > canvas.width - 100) {
				fitText('DOWN ' + name, canvas.width - 100, 'Handwritten', 128, 50, canvas.height / 4);
			} else {
				ctx.fillText('DOWN ' + name, 50, canvas.height / 4);
			};
			ctx.font = '64px "Handwritten"';
			ctx.textAlign = 'center';
			ctx.fillStyle = '#02a166';
			if (nameWidth > (canvas.width / 2 - 50)) {
				fitText(name, canvas.width / 2 - 50, 'Handwritten', 64, canvas.width * 0.75, canvas.height / 1.6);
			} else {
				ctx.fillText(name, canvas.width * 0.75, canvas.height / 1.6);
			};

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
