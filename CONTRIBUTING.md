# Contribution Guide
Help us share faces!   
1. Clone the repo (`git clone https://github.com/matteojoliveau/lodbot.git`)
2. Modify code
3. Open [PR](https://github.com/MatteoJoliveau/lodbot/pulls)

## Bot Token
You need a Telegram bot token from [BotFather](https://t.me/BotFather) in order to test the bot on your own.  
Follow the deployment instruction in the [README](README.md#run) for more information about how
to pass it to the bot.

If you want to help expand our face selection, go to [www.disapprovallook.com](http://www.disapprovallook.com). Here you can find
all the LoD faces you may desire. Copy their **text** representation and create a new entry in the `src/faces.js` file following the following *JSON* schema:   
```javascript
IDENTIFIER: {
  name: "Identifier",
  face: "(☞ﾟヮﾟ)☞" //text representation of the face
}
```

### THANK YOU, ANY HELP IS MUCH APPRECIATED! ( ͡° ͜ʖ ͡°)
