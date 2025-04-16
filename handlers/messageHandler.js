const path = require('path');

module.exports = (client) => {

  client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    global.autoreactConfigs.forEach((config) => {
      if (config.userId === message.author.id) {
        config.emojis.forEach((emoji) => {
          message.react(emoji).catch(console.error);
        });
      }
    });

    const { allowedUserIDs } = require(path.join(__dirname, '../config'));
    if (allowedUserIDs.includes(message.author.id)) {
      console.log(`[MESSAGE] ${message.author.tag}: ${message.content}`);
    }
  });
};