@echo off

echo Starting Making The Package.json

call npm init -y

echo Installing required packages

call npm install discord.js-selfbot-v13@latest
call npm install axios
call npm install electron --save-dev
call npm install groq-sdk

echo All setup is complete. You can now run your bot.

exit