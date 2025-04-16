const axios = require('axios');
const Groq = require('groq-sdk');
const { OPENROUTER_API_KEY, GROQ_API_KEY } = require('../../config');
const groq = new Groq({ apiKey: GROQ_API_KEY });

module.exports = {
  name: 'ai',
  aliases: ['askai', 'ask'],
  description: 'Ask either DeepSeek or Groq AI a question.',
  usage: '`ai <groq> <question>`\nExample: `ai deepseek What is the meaning of life?`',
  async execute(message, args) {
    if (args.length < 2) {
      return message.channel.send(`Usage: ${this.usage}`).catch(console.error);
    }

    const aiType = args[0].toLowerCase();
    const question = args.slice(1).join(' ');

    try {
      let answer = '';
      if (aiType === 'deepseekdisabled') {
        // DeepSeek
        const url = "https://openrouter.ai/api/v1/chat/completions";
        const headers = {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        };
        const data = {
          model: "deepseek/deepseek-v3-base:free",
          messages: [{ role: "user", content: question }],
        };

        const response = await axios.post(url, data, { headers });
        if (response.status === 200) {
          answer = response.data.choices[0].message.content || "No response from DeepSeek AI.";
        } else {
          throw new Error("Error fetching response from DeepSeek AI.");
        }
      } else if (aiType === 'groq') {
        // Groq
        const chatCompletion = await groq.chat.completions.create({
          messages: [{ role: "user", content: question }],
          model: "llama-3.3-70b-versatile",
        });

        if (chatCompletion.choices) {
          answer = chatCompletion.choices[0]?.message?.content || "No response from Groq AI.";
        } else {
          throw new Error("Error fetching response from Groq AI.");
        }
      } else {
        return message.channel.send('Invalid AI type. Please choose either `deepseek` or `groq`.').catch(console.error);
      }

      const chunkSize = 2000;
      const chunks = [];

      function splitAnswer(answer) {
        if (answer.length <= chunkSize) {
          chunks.push(answer);
          return;
        }

        const lastSpaceIndex = answer.lastIndexOf(' ', chunkSize);
        if (lastSpaceIndex === -1) {
          chunks.push(answer.substring(0, chunkSize));
          splitAnswer(answer.substring(chunkSize));
        } else {
          chunks.push(answer.substring(0, lastSpaceIndex));
          splitAnswer(answer.substring(lastSpaceIndex + 1));
        }
      }

      splitAnswer(answer);

      for (const chunk of chunks) {
        await message.channel.send(chunk);
      }
    } catch (error) {
      console.error('Error processing AI request:', error);
      message.channel.send(`An error occurred: ${error.message}`).catch(console.error);
    }
  },
};