import { Client, GatewayIntentBits } from 'discord.js'

import { Commands } from './types'

export const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
}) as Client & {
  commands: Commands
}
