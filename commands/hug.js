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
			hug(member, false/*true*/)
		} else {
			hug(member, false)
		}
		async function hug(victim, state) {
			member = victim;

			const { createCanvas } = require('canvas');

			const background = await Canvas.loadImage('commands/images/hug.png');
			const canvas = createCanvas(background.width, background.height);
			const ctx = canvas.getContext('2d');
			if (state) {
				ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

				ctx.beginPath();
				ctx.arc(canvas.width, 100, 100, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.clip();

				const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
				ctx.drawImage(avatar, canvas.width - 100, 0, 200, 200);

				const attachment = new Discord.Attachment(canvas.toBuffer(), 'hug.png');
			}

			const newEmbed = new Discord.RichEmbed()
				.setColor('#6b0c19')
				.attachFiles([attachment])
				.setImage('attachment://hug.png')
				.setTimestamp()
				.setFooter(message.member.displayName + ' made me do it.');

			message.channel.send(newEmbed);
		}
	},
};
