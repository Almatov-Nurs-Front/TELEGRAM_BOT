// Modules
import 'dotenv/config';
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
// ChatGPT
import { ChatGPT } from './chatgpt.js'
import axios from 'axios';


const config = {
  handlerTimeout: Infinity
};

const bot = new Telegraf(process.env.TELEGRAM_KEY, config);

bot.command('start', (ctx) => {
  ctx.reply('ChatGPT бот успешно запущен!');
});

bot.command('clear', async (ctx) => {
  await axios.delete('http://localhost:3001/api/v1/remove-messages');
  ctx.reply('ChatGPT бот очищен!');
});

bot.on(message('text'), async (ctx) => {
  await axios.post('http://localhost:3001/api/v1/add-message', { role: 'user', content: ctx.message.text });
  const response = await axios.get('http://localhost:3001/api/v1/messages');

  const message = await ChatGPT(response.data.map(({ role, content }) => ({ role, content })));

  await axios.post('http://localhost:3001/api/v1/add-message', { role: 'assistant', content: message.content });

  ctx.reply(message.content);
});

bot.launch();
