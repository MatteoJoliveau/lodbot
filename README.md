# LoD Bot
Look of Disapproval Bot, to spam funny faces in Telegram chats

Check out our [contribution guide](CONTRIBUTING.md) if you want to add a face to the pack!

## Run

This bot is developed as an [Apache OpenWhisk] action based on [NodeJS 12]. To deploy it you'll need
Node, [Yarn 1.x] and a properly configured [wsk] CLI. A manifest file for [wskdeploy] is also provided
to speed up the deployment process.

Here is a step-by-step tutorial to deploy LoD Bot.


```bash
# Install dependencies
yarn install

# Build and deploy (this assumes properly configured wsk and wksdeploy commands are in the PATH)
yarn deploy

# FIRST TIME POST INSTALL
# These commands only need to be executed the first time the package is deployed.

# Retrieve the webhook URL
wsk api list

# Configure the webhook URL on Telegram. Use the right values for $BOT_TOKEN and $WEBHOOK_URL
wsk action invoke /myNamespace/lodbot/setWebhook -p botToken $BOT_TOKEN -p webhookUrl $WEBHOOK_URL

# Configure the token on the bot action
wsk action update /myNamespace/lodbot/lodbot --param botToken $BOT_TOKEN

# Done!
```

After the first deployment the bot can be updated by simply running `yarn deploy` again.

## Mozilla Public License 2.0
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/. 

[Apache Openwhisk]: https://openwhisk.apache.org/
[NodeJS 12]: https://nodejs.org/en/
[Yarn 1.x]: https://classic.yarnpkg.com/lang/en/
[wsk]: https://github.com/apache/openwhisk/blob/master/docs/cli.md
[wskdeploy]: https://github.com/apache/openwhisk-wskdeploy