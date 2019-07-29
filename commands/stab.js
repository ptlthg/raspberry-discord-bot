const Canvas = require('canvas');
const Discord = require('discord.js');
module.exports = {
	name: 'stab',
	description: 'Stab someone with a spear.',
	aliases: ['spear', 'penetrate', 'jab'],
	args: true,
	usage: '<user>',
	guildOnly: true,
	execute(message, args) {
		var member = message.mentions.members.first();
		if (member !== undefined) {
			kill(member, true)
		} else {
			message.channel.send('No user specified, going to stab everyone in their sleep now, thanks ' + message.member.displayName + '!')
		}
		async function kill(victim, state) {
			member = victim;

			const { createCanvas } = require('canvas');

			const background = await Canvas.loadImage('commands/images/stab.png');
			const canvas = createCanvas(background.width, background.height);
			const ctx = canvas.getContext('2d');

			ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

			ctx.beginPath();
			ctx.arc(canvas.width - 110, canvas.height / 7 + 75, 75, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.clip();

			const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
			ctx.drawImage(avatar, canvas.width - 185, canvas.height / 7, 150, 150);

			const attachment = new Discord.Attachment(canvas.toBuffer(), 'stab.png');

			const newEmbed = new Discord.RichEmbed()
				.setColor('#6b0c19')
				.attachFiles([attachment])
				.setImage('attachment://stab.png')
				.setFooter(message.member.displayName + ' made me do it.');

			message.channel.send(newEmbed);
		}
	},
};
