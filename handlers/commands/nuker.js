const fs = require('fs');
const Discord = require('discord.js-selfbot-v13');
const { subprocess, getExecutablePath } = require('../../scripts/uni/utils');
const executablePath = getExecutablePath();

module.exports = {
  name: 'nuker',
  aliases: ['raidkit', 'killer'],
  description: 'Runs a discord raid kit made by the-cult-of-integral on github',
  execute(message, args) {
    message.channel.send('Running the raid kit...').catch(console.error);
    message.channel.send('Please Check Out RaidKit Ceator On Github [The Cult Of Intergal](<https://github.com/the-cult-of-integral>)').catch(console.error);
    subprocess(`start ${executablePath}/handlers/commands/python/discord_nuker/Discord-RaidKit.exe`);

    setTimeout(() => {
      function readConfig() {
        const configFile = fs.readFileSync('config.json', 'utf8');
        const config = JSON.parse(configFile);
        return {
          token: config.Horus.Token,
          applicationId: config.Horus.ApplicationID,
        };
      }

      const { applicationId } = readConfig();

      const applicationUrl = `https://discord.com/oauth2/authorize?client_id=${applicationId}&permissions=8&scope=bot`;
      const inviteMessage = `Please Invite Your Bot: Invite URL: ${applicationUrl}`;
      message.channel.send(inviteMessage).catch(console.error);
    }, 1800);
  },
};  