module.exports = {
	name: 'kick',
	description: 'Kick someone you don\'t like.',
	args: true,
	usage: '<user>',
	guildOnly: true,
	execute(message, args) {
		console.log(message.member);
		if (message.member.hasPermission('KICK_MEMBERS') || message.member.id === '609881268494008330') {
	    let member = message.mentions.members.first();
	    if (member !== undefined) {
				member.kick().then((member) => {
					message.channel.send(member.displayName + ' has been kicked because of reasons')
				}).catch(() => {
					message.channel.send('Error')
				})
			} else {
				message.channel.send('No user specified, kicking everyone after I finish this chess game.')
			}
		} else {
	    message.channel.send('Oi! You don\'t have permission to do that me boi!')
	  }
	},
};
