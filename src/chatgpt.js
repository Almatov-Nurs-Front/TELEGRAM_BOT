import 'dotenv/config';
import OpenAI from 'openai';
import { helpers } from './helpers.js';


const CHATGPT_MODEL = 'gpt-3.5-turbo';

const ROLES = {
  SYSTEM: 'system',
  USER: 'user',
  ASSISTANT: 'assistant',
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function ChatGPT(messages = []) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: ROLES.SYSTEM, content: helpers.systemContent },
        ...messages
      ],
      model: CHATGPT_MODEL,
    });

    return completion.choices[ 0 ].message;
  } catch (error) {
    console.error('Error while chat completion:\n\n', error);
    throw new Error('Error while chat completion:\n\n', error);
  }
};

