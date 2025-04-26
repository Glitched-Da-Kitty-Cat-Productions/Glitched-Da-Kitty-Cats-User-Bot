const axios = require('axios');

module.exports = {
name: 'cat',
description: 'Fetches a random cat image from The Cat API.',

async execute(message, args) {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search');
        const catImageUrl = response.data[0].url;
        message.channel.send(catImageUrl).catch(console.error);
    },
};