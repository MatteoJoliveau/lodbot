const path = require('path');
const {Faces} = require('./faces');
const {Utils} = require('./utils');
const Telegraf = require('Telegraf');

const utils = new Utils();
const config = utils.loadConfig(path.resolve(__dirname + "/config.yml"));

const bot = new Telegraf(config.telegram.token);

bot.command("test", (ctx) => {
  console.log("Hello!");
})

bot.on('inline_query', (ctx) => {
   ctx.answerInlineQuery(utils.getAllFaces());
});

bot.startPolling();
