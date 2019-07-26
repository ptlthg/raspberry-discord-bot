const Canvas = require('canvas');
const Discord = require('discord.js');
module.exports = {
	name: 'snipe',
	description: 'Snipe someone.',
	aliases: ['shoot'],
	args: true,
	usage: '<user>',
	guildOnly: true,
	execute(message, args) {
		var member = message.mentions.members.first();
		if (member !== undefined) {
			kill(member, true)
		} else {
			message.channel.send('No user specified, going to snipe everyone in their sleep now, thanks ' + message.member.displayName + '!')
		}
		async function kill(victim, state) {
			member = victim;

			const { createCanvas } = require('canvas');

			const background = await Canvas.loadImage('commands/images/snipe.jpg');
			const canvas = createCanvas(background.width, background.height);
			const ctx = canvas.getContext('2d');

			ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

			ctx.beginPath();
			ctx.arc(canvas.width - 175, 275, 75, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.clip();

			const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
			ctx.drawImage(avatar, canvas.width - 250, 200, 150, 150);

			const attachment = new Discord.Attachment(canvas.toBuffer(), 'snipe.png');

			const newEmbed = new Discord.RichEmbed()
				.setColor('#6b0c19')
				.attachFiles([attachment])
				.setImage('attachment://snipe.png')
				.setFooter(message.member.displayName + ' made me do it.');

			message.channel.send(newEmbed);
		}
	},
};
