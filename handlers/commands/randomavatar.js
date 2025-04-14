const axios = require('axios');

module.exports = {
    name: 'randomavatar',
    aliases: ['randavatar', 'rav'],
    description: 'Sends a random profile picture.',
    async execute(message) {
        try {
            const randomText = Math.random().toString(36).substring(7);

            const response = await axios.get(`https://robohash.org/${randomText}`, {
                responseType: 'arraybuffer' 
            });

            const avatarBuffer = Buffer.from(response.data, 'binary');

            message.channel.send({
                files: [{
                    attachment: avatarBuffer,
                    name: 'random_avatar.png' 
                }]
            });
        } catch (error) {
            console.error('Error fetching random avatar:', error);
            message.reply('An error occurred while fetching the random avatar.');
        }
    }
};
