const path = require('path');
const {Faces} = require('./faces');
const {Utils} = require('./utils');
const Telegraf = require('telegraf');

const utils = new Utils();
const config = utils.loadConfig(path.resolve(__dirname + "/config.yml"));

const bot = new Telegraf(config.telegram.token);

bot.command("start", (ctx) => {
  const reply = "<b>HOWDY FELLOW LOOKER!</b>\nWelcome to <b>Look of Disapproval Bot</b>, a friendly bot to friendly spam friendly faces :D.\nIf a face does not"
  + "appear in the selection, feel free to add it yourself! Follow our <a href=\"https://github.com/MatteoJoliveau/lodbot/blob/master/CONTRIBUTING.md\">contribution guide</a> to learn how to do it.\n"
  + "<b>HAPPY SPAM!</b>"
  ctx.replyWithHTML(reply);
})

bot.on('inline_query', (ctx) => {
   ctx.answerInlineQuery(utils.getAllFaces());
});

bot.startPolling();
