const fs = require('fs');
const path = require('path');

const deletedMessages = new Map();

module.exports = {
  name: 'snipe',
  description: 'Snipes the last deleted message in the channel.',
  async execute(message) {
    const channel = message.channel;
    const lastDeletedMessage = deletedMessages.get(channel.id);

    if (!lastDeletedMessage) {
      return message.reply('No deleted messages found in this channel.');
    }

    const { author, content, attachments, timestamp } = lastDeletedMessage;
    let messageContent = `**Sniped Message:**\n`;
    messageContent += `**Author Display Name:** ${author.displayName}\n`;
    messageContent += `**Author Username:** ${author.username}\n`;
    messageContent += `**Author ID:** ${author.id}\n`;
    messageContent += `**Deleted at:** <t:${Math.floor(timestamp / 1000)}:R>\n`;
    messageContent += `**Content:** ${content}\n`;

    deletedMessages.delete(channel.id);
  },
};

module.exports.messageDelete = async (message) => {
  const channel = message.channel;
  const timestamp = Date.now();

  deletedMessages.set(channel.id, {
    author: message.author,
    content: message.content,
    attachments: message.attachments,
    timestamp,
  });

  setTimeout(() => {
    deletedMessages.delete(channel.id);
  }, 20 * 60 * 1000);
};