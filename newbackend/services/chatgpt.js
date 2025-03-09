import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();  // Load .env variables

const openaiApiKey = process.env.OPENAI_API_KEY;  // Get OpenAI API key from the environment

export const getHealthScore = async (data) => {
  const prompt = `Given the following environmental data, calculate a health score on a scale of 1-5 (1 being the lowest, 5 being the highest). Provide just the number: ${JSON.stringify(data)}`;

  console.log('Sending prompt to OpenAI API:', prompt); // Log the prompt sent to OpenAI

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',  // Use gpt-3.5-turbo
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 100,
      temperature: 0.5,
    }, {
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
      }
    });

    console.log('OpenAI response:', response.data); // Log the response from OpenAI

    // Extracting only the numeric score from the response text
    const healthScore = response.data.choices[0].message.content.trim();
    return parseFloat(healthScore); // Ensure it's a number
  } catch (error) {
    console.error("Error generating health score from OpenAI:", error);
    throw error;
  }
};