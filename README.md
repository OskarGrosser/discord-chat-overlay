# Discord chat-overlay

Let a Discord bot watch a channel to send messages live to a local website.
Can be used as a browser source for streaming software, e.g. OBS or Streamlabs.

## How to use

Quick run-through of how to use:
1. [Setup](https://discordjs.guide/preparations/setting-up-a-bot-application.html) and [add a Discord bot to your server](https://discordjs.guide/preparations/adding-your-bot-to-servers.html).
2. Configure your `.env` file (more on this later!).
3. Start the application: `npm start` (requires NodeJS!).
4. See results at `http://localhost:PORT/chat.html` (for `PORT`, use the value set in the `.env` file).

The bot requires read permission for servers.

To configure your `.env` file you have to:
1. Rename `.env.example` to `.env`.
2. Set `PORT` to the port number you want to use in the `.env` file.
3. Set `BOT_TOKEN` to the Discord bot's token in the `.env` file.
4. Set `CHANNEL_ID` to [the (text-)channel-ID](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)
  of the channel you want to watch in the `.env` file.

## How to customize

A rough example is currently in place in `/src/server/static/scripts/chat.js`, which uses the Web Components API and Web Animations API. This depends on the current implementation of the events of [`bot`](https://discord.js.org/#/docs/discord.js/stable/class/Client) in `/src/index.js`.

### Customize the frontend

The visible elements are `MessageElement`s, which accept these CSS custom properties:
* `--color`: Changes the default text colour.
* `--author-color`: Changes the colour of the message author.
* `--bg-color`: Changes the background colour of the message.
* `--bg-color-hover`: Changes the background colour of the message on hover.

For customizing the SocketIO events, a `message` is sent (similar to Discord's [`Message`](https://discord.js.org/#/docs/discord.js/stable/class/Message)), which includes:
* `id`
* `content`
* `cleanContent`
* `member.displayName`
* `member.displayAvatarUrl`
* `member.displayHexColor`

Note that in the current implementation in `/src/index.js`, only `id` is sent for the event `messageDelete`.

### Customize the backend

The most notable places to be changed are the the if-statements and what to include of each message in the bot's event-handlers.

Currently, the bot disregards all messages not sent in the channel `CHANNEL_ID` (see `.env` file), and all messages that are not [default messages or replies](https://discord.js.org/#/docs/discord.js/stable/typedef/MessageType).
