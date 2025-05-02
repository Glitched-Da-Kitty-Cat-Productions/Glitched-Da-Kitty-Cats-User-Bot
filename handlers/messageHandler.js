const fs = require('fs');
const path = require('path');

const messageCache = new Map();
const deletedMessages = new Map();

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

    const attachments = Array.from(message.attachments.values()).map((attachment) => ({
      id: attachment.id,
      url: attachment.url,
      filename: attachment.name,
      size: attachment.size,
    }));

    messageCache.set(message.id, {
      author: message.author,
      content: message.content,
      attachments,
    });
  });

  client.on('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage.content === newMessage.content) return;

    const attachments = Array.from(newMessage.attachments.values()).map((attachment) => ({
      id: attachment.id,
      url: attachment.url,
      filename: attachment.name,
      size: attachment.size,
    }));

    messageCache.set(newMessage.id, {
      author: newMessage.author,
      content: newMessage.content,
      attachments,
    });
  });

  client.on('messageDelete', (message) => {
    if (!message.id) return;

    const cachedMessage = messageCache.get(message.id);
    if (!cachedMessage) return;

    const channel = message.channel;
    const key = channel.id;
    const timestamp = Date.now();

    deletedMessages.set(key, {
      author: cachedMessage.author,
      content: cachedMessage.content,
      attachments: cachedMessage.attachments,
      timestamp,
    });

    messageCache.delete(message.id);

    setTimeout(() => {
      deletedMessages.delete(key);
    }, 20 * 60 * 1000);
  });
};
module.exports.deletedMessages = deletedMessages;