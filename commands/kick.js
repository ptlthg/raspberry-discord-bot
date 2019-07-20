module.exports = {
	name: 'kick',
	description: 'Kick someone you don\'t like.',
	execute(message, args) {
		if (message.member.hasPermission('KICK_MEMBERS')) {
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
