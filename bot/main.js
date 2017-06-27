const fs = require('fs');
const path = require('path');
const faces = require('./faces.json');
const {Utils} = require('./utils');
const Telegraf = require('telegraf');
const NodeCache = require('node-cache');

let pendingOffset = 0;

const utils = new Utils();
const botCache = new NodeCache({stdTTL: 120});

const config = utils.loadConfig(path.resolve(__dirname + "/config.yml"));
const all_faces = utils.getAllFaces(faces);

const masterId = process.env.BOT_MASTER_ID || config.telegram.masterId

const bot = new Telegraf(process.env.BOT_TOKEN || config.telegram.token);

bot.command("start", (ctx) => {
  const reply = "<b>HOWDY FELLOW LOOKER!</b>\nWelcome to <b>Look of Disapproval Bot</b>, a friendly bot to friendly spam friendly faces :D.\nIf a face does not" +
  "appear in the selection, feel free to add it yourself! Follow our <a href=\"https://github.com/MatteoJoliveau/lodbot/blob/master/CONTRIBUTING.md\">contribution guide</a> to learn how to do it.\n" +
  "<b>HAPPY SPAM!</b>"
  ctx.replyWithHTML(reply);
})

bot.command('suggest', (ctx) => {
  ctx.replyWithHTML("<b>Thanks for willing to contribute!</b> Now send me a message with the new face to add!");
  botCache.set(ctx.chat.id, {
    sender: ctx.chat.id
  }, function(err, success) {
    if (err) {
      handleErrors(err);
    }
  })
});
bot.command(`suggest@${config.telegram.username}`, (ctx) => ctx.reply("Submit new faces by sending me this command in a private chat!"));

bot.on('text', (ctx) => {
  if (ctx.chat.type === "private") {
    botCache.get(ctx.chat.id, function(err, value) {
      if (!err) {
        if (value != undefined) {
          if (!value.hasOwnProperty('face')) {
            value.face = ctx.message.text;
            ctx.replyWithHTML("Thanks. Now send me the name of this face!");
          } else if (!value.hasOwnProperty('name')) {
            value.name = ctx.message.text;
            botCache.set(`offset-${pendingOffset}`, value)
            ctx.replyWithHTML(`<b>Thank you!</b> Your face \'${value.face}\' called ${value.name} has been sent for approval. You'll get a notification after the process.\n<b>HAPPY SPAM</b>`)
          }
        }
      } else {
        handleErrors(err);
      }
    }
  });
});

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

bot.action("master-yes", (ctx) => {
  const key = `offset-${pendingOffset}`;
  botCache.get(key, function(err, value) {
    if (err) {
      handleErrors(err)
    } else if (value != undefined) {
      faces.push({"name": value.name, "face": value.face});
      pendingOffset++;
      ctx.telegram.sendMessage(value.sender, `Your face ${value.name} \'${value.face}\' has been approved! Thank you for your help :D`);
      ctx.answerCallbackQuery("Face approved!");
      botCache.del(key)
    }
  }
});

bot.action("master-no", (ctx) => {
  botCache.get(key, function(err, value) {
    if (err) {
      handleErrors(err)
    } else if (value != undefined) {
      ctx.telegram.sendMessage(value.sender, "Sorry, your key has been refused. Contact @GamesCodex to ask for the reason.");
      botCache.del(`offset-${pendingOffset}`);
      pendingOffset++;
    }
  }
});

bot.command('pending', (ctx) => {
    if (ctx.chat.id === masterId) {
        getPending(ctx);
    }
});

bot.startPolling();

function handleErrors(err) {
  ctx.telegram.sendMessage(masterId, `ERROR LOG: there was an error with user ${ctx.from.first_name}. Error: ${err}`)
  console.error(err);
}

function sendNewFaces(ctx) {
  ctx.replyWithHTML("<b>Thanks for willing to contribute!</b> Now send me a message with the new face to add!")
}

function getPending(ctx) {
  botCache.get(`offset-${pendingOffset}`, function(err, value) {
    if (err) {
      handleErrors(err);
    } else if (value != undefined) {
      ctx.telegram.sendMessage(masterId, `New face for approval.\nName: ${value.name}\nFace: ${value.face}\nDo you approve it?`, {
        parse_mode: "HTML",
        inline_keyboard: [
          {
            text: "Yes",
            callback_data: "master-yes"
          }, {
            text: "No",
            callback_data: "master-no"
          }
        ]
      });
    } else {
      ctx.telegram.sendMessage(masterId, "No faces pending c:");
    }
  })
}
