const axios = require('axios');
const config = require('../../config');
const { aliases } = require('./rpc');

const token = config.token;
let INTERVAL = config.interval;
const GUILDS = config.guilds;
const DISCORD_API_URL = "https://discord.com/api/v9/users/@me/clan";
const allowedUserId = config.allowedUserId;
const autorun = config.autoGuildTagSwitcher;

let guildRotationTask = null;
let switchCount = 0;
const startTime = Date.now();

async function changeIdentity(guildName, guildId) {
    const headers = {
        "Authorization": token,
        "Content-Type": "application/json"
    };

    const payload = {
        "identity_guild_id": guildId,
        "identity_enabled": true
    };

    try {
        const response = await axios.put(DISCORD_API_URL, payload, { headers });
        if (response.status === 200) {
            console.log(`Successfully changed to ${guildName}`);
            switchCount++;
        } else {
            console.log(`Failed to change to ${guildName}. Status Code: ${response.status}, Response: ${response.data}`);
        }
    } catch (error) {
        console.error(`Error while changing to ${guildName}: ${error}`);
    }
}

async function rotateGuilds() {
    while (true) {
        for (const [guildName, guildId] of Object.entries(GUILDS)) {
            await changeIdentity(guildName, guildId);
            await new Promise(resolve => setTimeout(resolve, INTERVAL));
        }
    }
}

module.exports = {
    name: 'guildtag',
    description: 'Guild tag switcher',
    aliases: ['gr', 'guildswitch'],
    usage: '.guildtag <start|delay|status> [value]',
    async execute(message, args) {
        if (args[0] === 'start') {
            if (!guildRotationTask) {
                guildRotationTask = rotateGuilds();
                message.channel.send("Started");
            } else {
                message.channel.send("Already Running");
            }
        }

        if (args[0] === 'delay') {
            const delay = parseFloat(args[1]);
            if (delay > 0.3) {
                INTERVAL = delay * 1000;
                config.interval = INTERVAL;
                message.channel.send(`Guild rotation delay changed to ${INTERVAL / 1000} seconds.`);
            } else {
                message.channel.send("Delay must be a positive number greater than 0.3 please");
            }
        }

        if (args[0] === 'status') {
            const elapsedTime = Date.now() - startTime;
            const seconds = Math.floor((elapsedTime / 1000) % 60);
            const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
            const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
            const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));

            message.channel.send(`Running Time: ${days}d ${hours}h ${minutes}m ${seconds}s\nGuild Switches: ${switchCount}`);
        }
    }
};