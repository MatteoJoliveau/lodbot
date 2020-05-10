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

# Copy and edit the deployment.yml file to change the configuration params
# The webhook URL has not bee generated yet, so skip it for now
cp deployment.example.yml
$EDITOR deployment.yml

# Build and deploy (this assumes properly configured wsk and wksdeploy commands are in the PATH)
yarn deploy

# FIRST TIME POST INSTALL
# These commands only need to be executed the first time the package is deployed.

# Retrieve the webhook URL
wsk api list

# Add the webhook URL to the deployment file
$EDITOR deployment.yml

# Redeploy
yarn deploy

# Set the webhook on Telegram servers
wsk action invoke /lodbot/lodbot/setWebhook

# Done!
```

After the first deployment the bot can be updated by simply running `yarn deploy` again.

## Configuration

As showcased in the _Run_ section above, the bot can be configured using the [deployment.yml](deployment.yml) file to bind parameters.

The available parameters, as well as their defaults, are listed in the `inputs` sections of
each action inside [manifest.yml](manifest.yml).

## Mozilla Public License 2.0
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/. 

[Apache Openwhisk]: https://openwhisk.apache.org/
[NodeJS 12]: https://nodejs.org/en/
[Yarn 1.x]: https://classic.yarnpkg.com/lang/en/
[wsk]: https://github.com/apache/openwhisk/blob/master/docs/cli.md
[wskdeploy]: https://github.com/apache/openwhisk-wskdeploy
[inline query response cache time]: https://core.telegram.org/bots/api#answerinlinequery