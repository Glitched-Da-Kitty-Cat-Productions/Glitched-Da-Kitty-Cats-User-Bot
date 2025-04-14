module.exports = {
    log: function(message) {
        console.log(`[LOG] ${new Date().toISOString()}: ${message}`);
    },
    error: function(message) {
        console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
    },
    formatCommand: function(command) {
        return command.trim().toLowerCase();
    },
    isValidCommand: function(command, validCommands) {
        return validCommands.includes(command);
    }
};