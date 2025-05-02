module.exports = {
    name: 'help',
    aliases: ['h', 'commands'],
    description: 'Displays a list of commands or detailed information about a specific command.',
    async execute(message, args) {
        const commands = message.client.commands;

        if (!commands) {
            return message.channel.send('No commands are currently loaded.').catch(console.error);
        }

        if (args.length === 0) {
            const commandList = Array.from(commands.values())
                .filter((cmd, index, self) => self.findIndex(c => c.name === cmd.name) === index) 
                .map(cmd => `\`${cmd.name}\`: ${cmd.description}`)
                .join('\n');

            const commandCount = commands.size;

            return message.channel.send(`**Available Command:**\n${commandList}\n\nUse \`help <command>\` for detailed information about a specific command.`);
        }

        const commandName = args[0].toLowerCase();
        const command = commands.get(commandName);

        if (!command) {
            return message.channel.send(`Command \`${commandName}\` not found. Use \`help\` to see all available commands.`);
        }

        const aliases = command.aliases ? command.aliases.map(alias => `\`${alias}\``).join(', ') : 'None';
        const usage = command.usage ? `\`${command.usage}\`` : 'No specific usage';

        return message.channel.send(
            `**Command:** \`${command.name}\`\n` +
            `**Description:** ${command.description}\n` +
            `**Aliases:** ${aliases}\n` +
            `**Usage:** ${usage}`
        );
    },
};