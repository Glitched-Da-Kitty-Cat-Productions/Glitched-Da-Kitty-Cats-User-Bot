const fs = require('fs');
const path = require('path');
const messageHandler = require('../messageHandler');

const deletedMessages = messageHandler.deletedMessages;
console.log(deletedMessages);


module.exports = {
  name: 'snipe',
  description: 'Snipes the last deleted message in the channel.',
  async execute(interaction, client) {
    const channel = interaction.channel;
    const key = channel.id;
    const lastDeletedMessage = deletedMessages.get(key);

    if (!lastDeletedMessage) {
      return interaction.reply('No deleted messages found in this channel.');
    }

    const { author, content, attachments, timestamp } = lastDeletedMessage;
    let messageContent = `**Sniped Message:**\n`;
    messageContent += `**Author Display Name:** ${author.displayName}\n`;
    messageContent += `**Author Username:** ${author.username}\n`;
    messageContent += `**Author ID:** ${author.id}\n`;
    messageContent += `**Deleted at:** <t:${Math.floor(timestamp / 1000)}:R>\n`;
    messageContent += `**Content:** ${content}\n`;

    if (content) {
      await interaction.channel.send(messageContent);
    }

    if (attachments.size > 0) {
      for (const attachment of attachments) {
        await interaction.channel.send(`**Deleted Attachment:**`, { files: [attachment.url] });
      }
    }

    deletedMessages.delete(key);
  },
};

module.exports.messageDelete = async (message) => {
  if (message.author.bot) return;

  const channel = message.channel;
  const key = channel.id;
  const timestamp = Date.now();

  deletedMessages.set(key, {
    author: message.author,
    content: message.content,
    attachments: message.attachments,
    timestamp,
  });

  setTimeout(() => {
    deletedMessages.delete(key);
  }, 20 * 60 * 1000);
};