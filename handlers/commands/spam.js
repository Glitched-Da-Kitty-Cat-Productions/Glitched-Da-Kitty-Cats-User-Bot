let spamInterval = null; 

module.exports = {
    name: 'spam',
    description: 'Spams a message multiple times or stops spamming.',
    usage: '`spam <count> <message>` or `spam stop`\nExample: `spam 5 Hello!`',
    aliases: ['sp', 'spammsg'],
    async execute(message, args) {
        if (args[0] === 'stop') {
            if (spamInterval) {
                clearInterval(spamInterval);
                spamInterval = null;
                return message.channel.send('Spamming stopped.').catch(console.error);
            } else {
                return message.channel.send('No spamming is currently active.').catch(console.error);
            }
        }

        if (args.length < 2) {
            return message.channel.send('Usage: `spam <count> <message>` or `spam stop`\nExample: `spam 5 Hello!`').catch(console.error);
        }

        const spamMessage = args.slice(1).join(' ');
        let count = parseInt(args[0]);

        if (isNaN(count) || count <= 0 || count > 1000) {
            return message.channel.send('Please provide a valid number between 1 and 1000 for the spam count.').catch(console.error);
        }

        let sentCount = 0;
        spamInterval = setInterval(() => {
            if (sentCount >= count) {
                clearInterval(spamInterval); 
                spamInterval = null;
                return;
            }
            message.channel.send(spamMessage).catch(console.error);
            sentCount++;
        }, 100);
    }
};