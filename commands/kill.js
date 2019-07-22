const Canvas = require('canvas');
const Discord = require('discord.js');
module.exports = {
	name: 'kill',
	aliases: ['k', 'murder', 'stab', 'shank'],
	description: 'Kill a user',
	args: true,
	usage: '<user> or any name',
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

			if (state) {
				let victims = JSON.parse(fs.readFileSync('commands/victims.json', 'utf8'));
				if (!victim[member.id]) victims[member.id] = {
					killed: 0,
				};
				let userData = victims[member.id];
				userData.killed++;
				fs.writeFile('commands/victims.json', JSON.stringify(killed), (err) => {
					if (err) console.error(err);
				});
				if (userData.killed > 0) {
					var random = Math.random();
					if (random < 1) { //Change to 0.1
						proceed = false

						const background = await Canvas.loadImage('commands/images/killagain.jpg');
						const canvas = createCanvas(background.width, background.height);
						const ctx = canvas.getContext('2d');

						ctx.font = '128px 'Handwritten'';
						ctx.fillStyle = '#02a166';

						ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

						if (!state) {
							var name = member.displayName.toUpperCase();
							var nameWidth = ctx.measureText(name).width;
							function fitText(text, size, fontface, fontsize, xPos, yPos) {
								do {
									fontsize--;
									ctx.font = fontsize + 'px ' + fontface;
								} while (ctx.measureText(text).width > size);
								ctx.fillText(text, xPos, yPos);
							}
							if (nameWidth > canvas.width / 2 - 100) {
								fitText(name, canvas.width / 2 - 100, 'Handwritten', 128, 50, canvas.height * 0.66);
							} else {
								ctx.fillText(name, canvas.width / 2 + 50, canvas.height * 0.66);
							};
						} else {
							ctx.beginPath();
							ctx.arc(canvas.width / 2 + 150, canvas.height / 2 + 100, 100, 0, Math.PI * 2, true);
							ctx.closePath();
							ctx.clip();

							const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
							ctx.drawImage(avatar, canvas.width / 2 + 50, canvas.height / 2, 200, 200);
						};
					}
				}
			}

			if (proceed == true) {
				const background = await Canvas.loadImage('commands/images/kill.jpg');
				const canvas = createCanvas(background.width, background.height);
				const ctx = canvas.getContext('2d');

				ctx.font = '128px 'Handwritten'';
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
				ctx.font = '64px 'Handwritten'';
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
				.setTimestamp()
				.setFooter(message.member.displayName + ' made me do it.');

			message.channel.send(newEmbed);
		}
	},
};
