const childProcess = require('child_process');
const path = require('path');
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
    },
    subprocess: function(command) {
        try {
            childProcess.exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error running subprocess: ${error.message}`);
                } else {
                    console.log(`Subprocess output: ${stdout}`);
                }
            });
        } catch (error) {
            console.error(`Error running subprocess: ${error.message}`);
        }
    },
    getExecutablePath: function() {
        return path.join(__dirname, '..', '..').replace(/\\/g, '/');
    }
};