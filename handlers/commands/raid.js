let raidInterval = null;

module.exports = {
  name: 'raid',
  description: 'Spams a message in every channel the user has permission to send messages.',
  usage: '`raid <count> <duration> <message>` or `raid stop`\nExample: `raid 5 30 Hello!`',
  aliases: ['rd', 'raidmsg'],
  async execute(message, args) {
    if (args[0] === 'stop') {
      if (raidInterval) {
        clearInterval(raidInterval);
        raidInterval = null;
        return message.channel.send('Raiding stopped.').catch(console.error);
      } else {
        return message.channel.send('No raiding is currently active.').catch(console.error);
      }
    }

    if (args.length < 3) {
      return message.channel.send('Usage: `raid <count> <duration> <message>` or `raid stop`\nExample: `raid 5 30 Hello!`').catch(console.error);
    }

    const raidMessage = args.slice(2).join(' ');
    let count = parseInt(args[0]);
    let duration = parseInt(args[1]);

    if (isNaN(count) || count <= 0 || count > 1000) {
      return message.channel.send('Please provide a valid number between 1 and 1000 for the raid count.').catch(console.error);
    }

    if (isNaN(duration) || duration <= 0) {
      return message.channel.send('Please provide a valid duration in seconds.').catch(console.error);
    }

    const channels = message.guild.channels.cache.filter(channel =>
      channel.isText() && channel.permissionsFor(message.member).has('SEND_MESSAGES')
    );

    if (channels.size === 0) {
      return message.channel.send('No channels available to send messages in.').catch(console.error);
    }

    const channelArray = Array.from(channels.values());

    const startTime = Date.now(); 
    raidInterval = setInterval(async () => {
      await Promise.all(channelArray.map(async (channel) => {
        try {
          await channel.send(raidMessage);
        } catch (error) {
          console.error(`Could not send message in ${channel.name}:`, error);
        }
      }));

      count--;
      if (count <= 0 || Date.now() - startTime >= duration * 1000) {
        clearInterval(raidInterval);
        raidInterval = null;
      }
    }, 10);
  }
};