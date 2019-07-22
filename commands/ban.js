module.exports = {
	name: 'ban',
	description: 'Ban someone you really don\'t like.',
	args: true,
	usage: '<user>',
	guildOnly: true,
	execute(message, args) {
		if (message.member.hasPermission('BAN_MEMBERS')) {
	    let member = message.mentions.members.first();
	    if (member !== undefined) {
				member.ban().then((member) => {
					message.channel.send(member.displayName + ' has been banned because of reasons')
				}).catch(() => {
					message.channel.send('Error')
				})
			} else {
				message.channel.send('No user specified, banning everyone after I finish this chess game.')
			}
		} else {
	    message.channel.send('Oi! You don\'t have permission to do that me boi!')
	  }
	},
};
