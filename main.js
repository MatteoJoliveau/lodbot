const path = require('path');
const {Faces} = require('./faces');
const {Utils} = require('./utils');
const Telegraf = require('telegraf');

const utils = new Utils();
const config = utils.loadConfig(path.resolve(__dirname + "/config.yml"));
const all_faces = utils.getAllFaces();

const bot = new Telegraf(process.env.BOT_TOKEN);


bot.command("start", (ctx) => {
  const reply = "<b>HOWDY FELLOW LOOKER!</b>\nWelcome to <b>Look of Disapproval Bot</b>, a friendly bot to friendly spam friendly faces :D.\nIf a face does not" +
  "appear in the selection, feel free to add it yourself! Follow our <a href=\"https://github.com/MatteoJoliveau/lodbot/blob/master/CONTRIBUTING.md\">contribution guide</a> to learn how to do it.\n" +
  "<b>HAPPY SPAM!</b>"
  ctx.replyWithHTML(reply);
})

bot.on('inline_query', (ctx) => {
  if (ctx.inlineQuery.query === "") {
    ctx.answerInlineQuery(all_faces, {cache_time: config.telegram.inline_cache});
  } else {
    const faces = all_faces.filter((item) => {
      const string = ctx.inlineQuery.query.toLowerCase();
      return item.title.toLowerCase().search(string) != -1;
    });
    ctx.answerInlineQuery(faces, {cache_time: config.telegram.inline_cache})
  }

});

bot.startPolling();
