
module.exports = {
  name: 'massleave',
  aliases: ['ml'],
  description: 'Leave multiple Discord servers at once',
  usage: '.massleave <serverId1>,<serverId2>,<serverId3>',
  execute: async (client, message, args) => {
    const serverIds = args[0].split(',');

    if (serverIds.length === 0) {
      return message.channel.send('Please provide at least one server ID.');
    }

    let successCount = 0;
    let failureCount = 0;

    for (const serverId of serverIds) {
      try {
        const guild = client.guilds.cache.get(serverId);
        if (guild) {
          await guild.leave();
          successCount++;
        } else {
          failureCount++;
        }
      } catch (error) {
        failureCount++;
        console.error(`Error leaving server ${serverId}: ${error.message}`);
      }
    }

    message.channel.send(`Left ${successCount} servers successfully. Failed to leave ${failureCount} servers.`);
  }
};