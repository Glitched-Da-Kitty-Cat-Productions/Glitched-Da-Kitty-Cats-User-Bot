// This file contains the JavaScript code for the frontend, handling user interactions and communicating with the Electron main process.

document.addEventListener('DOMContentLoaded', () => {
    const startBotButton = document.getElementById('start-bot');
    const stopBotButton = document.getElementById('stop-bot');
    const botStatus = document.getElementById('bot-status');

    startBotButton.addEventListener('click', () => {
        botStatus.textContent = 'Bot is starting...';
        // Communicate with the Electron main process to start the bot
        window.electronAPI.startBot();
    });

    stopBotButton.addEventListener('click', () => {
        botStatus.textContent = 'Bot is stopping...';
        // Communicate with the Electron main process to stop the bot
        window.electronAPI.stopBot();
    });

    // Listen for updates from the main process
    window.electronAPI.onBotStatusUpdate((status) => {
        botStatus.textContent = status;
    });
});