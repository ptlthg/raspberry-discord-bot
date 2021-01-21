const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command =
		client.commands.get(commandName) ||
		client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;
	
	if (message.author.id === '315455612505030657' || message.author.id === '174265140357627904') {
		var random = Math.random();
		let data = 'You really shouldn\'t be able to see this message, but it wouldn\'t suprise me if you broke this again';
		if (random < 0.15) {
			data = 'Maybe next time';
		} else if (random < 0.3) {
			data = 'Weird that you\'re even trying';
		} else if (random < 0.45) {
			data = `Why am I even hosting this for you?`;
		} else if (random < 0.6) {
			data = 'Read the room next time';
		} else if (random < 0.75) {
			data = 'What makes you think I\'d respond to you?';
		} else if (random < 0.9) {
			data = `Sorry I bet you totally wanted to use the ${command.name} command huh`;
		} else {
			data = 'You can\'t possibly expect to create a good community while actively banning people who\'ve annoyed you.';
		}
		return message.channel.send(data);
	}

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply("I can't execute that command inside DMs!");
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});

client.login(token);
