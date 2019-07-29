module.exports = {
	name: 'butter',
	aliases: ['b'],
	description: 'Butter conversion',
	usage: 'butter',
	guildOnly: false,
	execute(message, args) {
    message.channel.send(`
**Fahrenheit to Butter:**
\`(x°F - 66.2) / 2.34 = °B\`
**Celsius to Butter:**
\`(x°C - 19) / 1.3 = °B\`
**Butter to Fahrenheit:**
\`x°B * 2.34 + 66.2 = °F\`
**Butter to Celsius:**
\`x°B * 1.3 + 19 = °C\`
Adding 1° Butter is equivalent to adding 2.34°F or 1.3°C
		`)
	},
};
