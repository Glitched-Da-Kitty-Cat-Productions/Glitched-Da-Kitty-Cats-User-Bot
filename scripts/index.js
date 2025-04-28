const { Client } = require('discord.js-selfbot-v13');
const { token, prefix } = require('../config');
const { log, error } = require('./uni/utils');
const commandHandler = require('../handlers/commandHandler');
const messageHandler = require('../handlers/messageHandler');

global.autoreactConfigs = [];

const client = new Client();
client.prefix = prefix;


log('Starting bot...');

const handleError = (type, err) => {
  error(`${type}: ${err.message}`);
  console.error(err.stack);
};
process.on('unhandledRejection', (err) => handleError('Unhandled Rejection', err));
process.on('uncaughtException', (err) => handleError('Uncaught Exception', err));

const initializeBot = () => {
  log('Initializing bot handlers...');

  log('Loading commands...');
  commandHandler.loadCommands(client);

  log('Loading message handler...');
  messageHandler(client);
};
const startBot = async () => {
  try {
    await client.login(token);
    log('Bot logged in successfully!');
    initializeBot();
  } catch (err) {
    handleError('Failed to log in', err);
  }
};

startBot();