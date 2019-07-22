module.exports = {
	name: 'ping',
	aliases: ['p'],
	description: 'Pong!',
	usage: 'ping',
	guildOnly: false,
	execute(message, args) {
    message.channel.send('pong')
	},
};
