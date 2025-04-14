const { allowedUserIDs } = require('../config');

module.exports = (client) => {
    client.on('messageCreate', (message) => {
        if (message.author.bot) return;
        if (!allowedUserIDs.includes(message.author.id)) return;

        console.log(`[MESSAGE] ${message.author.tag}: ${message.content}`);
    });
};