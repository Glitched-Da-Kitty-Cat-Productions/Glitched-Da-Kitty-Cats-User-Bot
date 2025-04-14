const fs = require('fs');
const path = require('path');
const { allowedUserIDs } = require('../config');

const commands = new Map();

const loadCommands = (client) => {
    const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

    commandFiles.forEach(file => {
        const command = require(path.join(__dirname, 'commands', file));
        commands.set(command.name, command);

        if (command.aliases && Array.isArray(command.aliases)) {
            command.aliases.forEach(alias => commands.set(alias, command));
        }
    });

    client.commands = commands;

    client.on('messageCreate', (message) => {
        if (message.author.bot || !message.content.startsWith(client.prefix) || !allowedUserIDs.includes(message.author.id)) return;

        const [commandName, ...args] = message.content.slice(client.prefix.length).trim().split(/ +/);
        const command = commands.get(commandName.toLowerCase());

        if (command) {
            try {
                command.execute(message, args);
            } catch (err) {
                console.error(`Error executing command ${commandName}:`, err);
            }
        }
    });
};

module.exports = { loadCommands };