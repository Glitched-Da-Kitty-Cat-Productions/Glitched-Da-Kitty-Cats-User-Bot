module.exports = {
  name: 'autoreact',
  description: 'Auto react to new messages from a targeted user with a specified emoji or multiple emojis.',
  usage: 'autoreact <user_id> <emoji1>,<emoji2>,... | autoreact stop <user_id>',
  async execute(message, args) {
    if (args.length < 2) {
      return message.channel.send('Usage: `autoreact <user_id> <emoji1>,<emoji2>,...` or `autoreact stop <user_id>`').catch(console.error);
    }

    if (args[0].toLowerCase() === 'stop') {
      const userId = args[1];
      const configIndex = global.autoreactConfigs.findIndex((config) => config.userId === userId);

      if (configIndex !== -1) {
        global.autoreactConfigs.splice(configIndex, 1);
        message.channel.send(`Auto react stopped for user ${userId}`).catch(console.error);
      } else {
        message.channel.send(`User ${userId} is not being auto reacted to`).catch(console.error);
      }
    } else {
      const userId = args[0];
      const emojis = args.slice(1).join(',').split(',');

      const existingConfig = global.autoreactConfigs.find((config) => config.userId === userId);

      if (existingConfig) {
        existingConfig.emojis = emojis;
      } else {
        global.autoreactConfigs.push({ userId, emojis });
      }

      message.channel.send(`Auto react configured for user ${userId} with emojis ${emojis.join(', ')}`).catch(console.error);
    }
  },
};