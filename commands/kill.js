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
				//registerFont('commands/fonts/Font-On-A-Stick.ttf', { family: 'Handwritten' });

				const canvas = createCanvas(500, 500);
				const ctx = canvas.getContext('2d');
				//ctx.font = '12px "Handwritten"'
				const background = await Canvas.loadImage('commands/images/kill.jpg');

				ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
				ctx.fillText('Down ' + member.displayName, 250, 10)

				const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
				ctx.drawImage(avatar, 25, 0, 200, canvas.height);

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
