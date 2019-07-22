const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async message => {
  /*var logger = fs.createWriteStream('log.txt', {
  	flags: 'a'
  });
  //Don't pay attention to this and we're cool, yeah?
  logger.write('From: ' + message.member.displayName + ' (' + message.author.tag + ') ' + message.author + ' ' + ' At: ' + message.createdAt + '\n');
  logger.write(message.content + '\n');
  logger.write(message.url + '\n');
  logger.write('In: ' + message.channel.name + ' ' + message.channel + '\n')
  logger.end();*/
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});

client.login(token);
