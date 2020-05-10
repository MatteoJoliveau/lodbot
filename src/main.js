import Telegraf from 'telegraf';
import { FACES } from './faces';

async function main({ botToken, inlineCache: inlineCache = 0, ...update }) {
  try {
    console.log('Handling update', update.update_id);
    const bot = new Telegraf(botToken);

    bot.command("start", (ctx) => {
      const reply = `
  <b>HOWDY FELLOW LOOKER!</b>
  Welcome to <b>Look of Disapproval Bot</b>, a friendly bot to friendly spam friendly faces :D.
  If a face does not appear in the selection, feel free to add it yourself! Follow our <a href="https://github.com/MatteoJoliveau/lodbot/blob/master/CONTRIBUTING.md">contribution guide</a> to learn how to do it.
  <b>HAPPY SPAM!</b>
  `
      ctx.replyWithHTML(reply);
    })

    bot.on('inline_query', ({ inlineQuery: { id, query }, answerInlineQuery, from }) => {
      if (query === '') {
        console.log('Handling empty query', id, 'from', from.username || from.first_name);
        return answerInlineQuery(FACES, { cache_time: inlineCache });
      } else {
        console.log('Handling inline query', id, '[', query, '] from', from.username || from.first_name);
        const faces = FACES.filter((item) => (item.title.toLowerCase().search(query.toLowerCase()) !== -1));
        return answerInlineQuery(faces, { cache_time: inlineCache });
      }
    })

    await bot.handleUpdate(update);

    return {
      statusCode: 200,
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 200,
    };
  }
}

global.main = main;