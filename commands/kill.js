const Canvas = require('canvas');
const Discord = require('discord.js');
const fs = require('fs');
module.exports = {
	name: 'kill',
	aliases: ['k', 'murder', 'shank', 'stan'],
	description: 'Kill a user',
	args: true,
	usage: '(alt) <user> or any name',
	guildOnly: true,
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
			var proceed = true
			member = victim;

			const { registerFont, createCanvas } = require('canvas');
			registerFont('commands/fonts/Font-On-A-Stick.ttf', { family: 'Handwritten' });
			var canvas;

			var random = Math.random();
			if (random < 0.15 || args[0] === 'alt') {
				proceed = false

				const background = await Canvas.loadImage('commands/images/killagain.jpg');
				canvas = createCanvas(background.width, background.height);
				const ctx = canvas.getContext('2d');

				ctx.font = '128px "Handwritten"';
				ctx.fillStyle = '#02a166';

				ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

				if (!state) {
					var name = '';// = member.toString().toUpperCase();
					for (var i = 0; i < args.length; i++) {
						if (args[i] !== 'alt') {
							name = name + args[i] + ' ';
						};
					};
					name = name.slice(0, -1);
					name = name.toUpperCase();
					var nameWidth = ctx.measureText(name).width;
					function fitText(text, size, fontface, fontsize, xPos, yPos) {
						do {
							fontsize--;
							ctx.font = fontsize + 'px ' + fontface;
						} while (ctx.measureText(text).width > size);
						ctx.fillText(text, xPos, yPos);
					}
					if (nameWidth > canvas.width / 2 - 100) {
						fitText(name, canvas.width / 2 - 100, 'Handwritten', 128, canvas.width / 2 + 50, canvas.height * 0.66);
					} else {
						ctx.fillText(name, canvas.width / 2 + 50, canvas.height * 0.66);
					};
				} else {
					ctx.beginPath();
					//Draws circle
					ctx.arc(canvas.width / 2 + 155, canvas.height / 2 + 115, 125, 0, Math.PI * 2, true);
					ctx.closePath();
					//Uses circle as cookie cutter
					ctx.clip();

					const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
					//Draws pfp
					ctx.drawImage(avatar, canvas.width / 2 + 30, canvas.height / 2 - 10, 250, 250);
				};
			};

			if (proceed == true) {
				const background = await Canvas.loadImage('commands/images/kill.jpg');
				canvas = createCanvas(background.width, background.height);
				const ctx = canvas.getContext('2d');

				ctx.font = '128px "Handwritten"';
				ctx.fillStyle = '#6b0c19';

				ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
				if (state) {
					var name = member.displayName.toUpperCase();
				} else {
					var name = '';// = member.toString().toUpperCase();
					for (var i = 0; i < args.length; i++) {
						if (args[i] !== 'alt') {
							name = name + args[i] + ' ';
						};
					};
					name = name.slice(0, -1);
					name = name.toUpperCase();
				};
				var downWidth = ctx.measureText(name + ' DOWN').width;
				var nameWidth = ctx.measureText(name).width;

				function fitText(text, size, fontface, fontsize, xPos, yPos) {
					do {
						fontsize--;
						ctx.font = fontsize + 'px ' + fontface;
					} while (ctx.measureText(text).width > size);
					ctx.fillText(text, xPos, yPos);
				}
				if (downWidth > canvas.width - 100) {
					fitText(name + ' DOWN', canvas.width - 100, 'Handwritten', 128, 50, canvas.height / 4);
				} else {
					ctx.fillText(name + ' DOWN', 50, canvas.height / 4);
				};
				ctx.font = '64px "Handwritten"';
				ctx.textAlign = 'center';
				ctx.fillStyle = '#02a166';
				if (nameWidth > (canvas.width / 2 - 50)) {
					fitText(name, canvas.width / 2 - 50, 'Handwritten', 64, canvas.width * 0.75, canvas.height / 1.6);
				} else {
					ctx.fillText(name, canvas.width * 0.75, canvas.height / 1.6);
				};
			};

			const attachment = new Discord.Attachment(canvas.toBuffer(), 'kill.png');

			const newEmbed = new Discord.RichEmbed()
				.setColor('#6b0c19')
				.setAuthor('Oh boy! Here I go killing again!')
				.attachFiles([attachment])
				.setImage('attachment://kill.png')
				.setFooter(message.member.displayName + ' made me do it.');

			message.channel.send(newEmbed);
		}
	},
};
