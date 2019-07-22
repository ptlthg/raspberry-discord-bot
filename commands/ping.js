module.exports = {
	name: 'ping',
	aliases: ['p'],
	description: 'Pong!',
	args: false,
	usage: 'ping',
	guildOnly: false,
	execute(message, args) {
    message.channel.send('pong')
	},
};
