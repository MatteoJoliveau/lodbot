const Telegraf  = require("telegraf");

async function main({ botToken, webhookUrl }) {
  const bot = new Telegraf(botToken);
  console.log('Setting webhook to', webhookUrl);
  const done = await bot.telegram.setWebhook(webhookUrl);
  console.log('Webhook set:', done);
}

global.main = main;