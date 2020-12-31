const Canvas = require('canvas');
const Discord = require('discord.js');
module.exports = {
	name: 'hug',
	description: 'Hug someone.',
	args: false,
	usage: '<user> or blank',
	guildOnly: true,
	execute(message, args) {
		var member = message.mentions.members.first();
		if (member !== undefined) {
			hug(member, true)
		} else {
			hug(member, false)
		}
		async function hug(victim, state) {
			member = victim;

			const { createCanvas } = require('canvas');
			var attachment;
			
			if (state) {
				const background = await Canvas.loadImage('commands/images/hugbase.png');
				const canvas = createCanvas(background.width, background.height);
				const ctx = canvas.getContext('2d');

				ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

				ctx.beginPath();
				ctx.arc(canvas.width, 64, 64, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.clip();

				const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
				ctx.drawImage(avatar, 32, 80, 64, 64);

				const foreground = await Canvas.loadImage('commands/images/hugarms.png');
				ctx.drawImage(foreground, 0, 20, canvas.width, canvas.height);

				 attachment = new Discord.Attachment(canvas.toBuffer(), 'hug.png');
			} else {
				 attachment = new Discord.Attachment('commands/images/hug.png', 'hug.png');
			}

			const newEmbed = new Discord.RichEmbed()
				.setColor('#6b0c19')
				.attachFiles([attachment])
				.setImage('attachment://hug.png')
				.setFooter(message.member.displayName + ' made me do it.');

			message.channel.send(newEmbed);
		}
	},
};
