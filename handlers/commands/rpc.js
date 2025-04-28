const fs = require('fs');
const Discord = require('discord.js-selfbot-v13');
const { subprocess, getExecutablePath } = require('../../scripts/uni/utils');
const executablePath = getExecutablePath();

module.exports = {
  name: 'rpc',
  aliases: ['presences'],
  description: 'Allow you to set a custom presence for your Discord account.',
  execute(message, args) {
    message.channel.send('Running the RPC System...').catch(console.error);
    message.channel.send("Check out the oringal github repo on there website [www.customrp.xyz](<https://www.customrp.xyz>)\nFor A Tutoral Go To [NTTS's Video](<https://www.youtube.com/watch?v=-YUIRdb5Dv8&ab_channel=NoTextToSpeech>)").catch(console.error);
    subprocess(`start ${executablePath}/handlers/commands/CustomRP/CustomRP.exe`);
}
};  