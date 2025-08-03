# discord-bot-base

Base repo for discord bots using supabase &amp; discord.js for dynamic slash commands, events &amp; real time table subscriptions

## Setup

Install dependencies

```sh
npm install
```

Copy the .env.example to create your own environment file

```sh
cp .env.example .env
```

Replace the variables inside the .env with those that match your discord bot and server.

## Development

The application is designed to be dynamic for ease of development.
To add your own commands, events or supabase subscriptions follow the examples provided in each directory.

### Commands

For the commands directory, both the data object and execute function are required exports of the file.

The data object can be created using the SlashCommandBuilder from discord.js.
The execute function accepts one argument of ChatInputCommandInteraction also, from discord.js

### Events

For the events directory, the required exports are the name constant, and the execute function. The once boolean const is optional.

The name must be a key of ClientEvents from discord.js.
The once constant is a boolean which is used to decide when to trigger the execute function if it's set to false, then it will trigger each time that event is caught by the discord bot.

The execute function takes one argument client, which is the Client<true> type from discord.js.

### Subscriptions

The subscriptions directory allows us to subscribe to table changes in supabase.
The required exports from this file are table and execute. We also have an optional export of event.

The table export must be a table name from your supabase database.
The execute function accepts two arguments; payload (the payload recieved from the table change), and client (the discord client).

Please see the example "src/subscriptions/players.ts" on how subscriptions work.

## Running development or production servers

### Development

To run the development server use;

```sh
npm run dev
```

Which will use nodemon to watch for filechanges and reload on save.

### Production

To run this in production do the following;

```sh
npm run build
```

To build the javascript files in the dist folder.

And then to run the production server use;

```sh
npm run start
```
