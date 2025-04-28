# Glitched Da Kitty Cat 
[![Discord Presence](https://lanyard-profile-readme.vercel.app/api/1276059904548929549?theme=dark)](https://discord.com/users/1276059904548929549)

# Glitched Da Kitty Cats User-Bot

A selfbot for Discord with various commands and features, including AI integration, auto reactions, nuker commands, and more.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (comes with Node.js)

## Installation

1. Clone this repository.
2. Run the setup script to install dependencies:

```bat
setup.bat
```

This will initialize a `package.json` and install required packages such as `discord.js-selfbot-v13`, `axios`, `electron`, and `groq-sdk`.

## Configuration

Edit the `config.js` file to set up your bot:

- `token`: Your Discord user token. (See [this guide](https://gist.github.com/oyepriyansh/1be45b722181ec634664410cde244708) for how to get it)
- `prefix`: Command prefix for the bot (default is `.`)
- `allowedUserIDs`: Array of Discord user IDs allowed to use the bot. To get your user ID, enable Developer Mode in Discord, right-click your profile picture, and select "Copy User ID".
- `OPENROUTER_API_KEY`: API key for OpenRouter AI integration. Get it from [openrouter.ai](https://openrouter.ai/)
- `GROQ_API_KEY`: API key for Groq services. Get it from [groq.com](https://groq.com/)
- `interval`: Interval in milliseconds for auto guild tag switching.
- `guilds`: Object mapping guild names to their server IDs.

## Running the Bot

To start the bot, run:

```bat
run.bat
```

This will launch the bot using Electron.

## Project Structure

- `main.js`: Main Electron app entry point.
- `config.js`: Configuration file for the bot.
- `scripts/`: Contains core scripts for the bot.
  - `index.js`: Main script entry point.
  - `uni/`: Utility scripts.
- `handlers/commands/`: Command handlers for the bot.
  - Includes commands like `ai.js`, `autoreact.js`, `nuker.js`, `ping.js`, `raid.js`, `spam.js`, and more.
  - Contains subfolders like `CustomRP/` and `python/` for additional command sets.
- `frontend/`: Frontend files for the Electron app (HTML, CSS, JS).
- `run.bat`: Batch script to launch the bot.
- `setup.bat`: Batch script to install dependencies.

## Features

- AI-powered commands using OpenRouter API.
- Auto reactions and auto guild tag switching.
- Nuker commands for server management.
- Various utility commands like ping, help, spam, snipe, etc.
- Integration with Groq API.

## Notes

- This bot uses a selfbot library (`discord.js-selfbot-v13`), which may violate Discord's Terms of Service. Use at your own risk.
- Make sure to keep your token and API keys secure.
- This project is intended for educational and personal use only.
- This readme was ai generetated because i am lazy and didnt sleep
