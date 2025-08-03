import {
  Client,
  Collection,
  CommandInteraction,
  GatewayIntentBits,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js'

export const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
}) as Client & {
  commands: Collection<
    string,
    {
      data:
        | SlashCommandBuilder
        | SlashCommandOptionsOnlyBuilder
        | SlashCommandSubcommandsOnlyBuilder
      execute: (interaction: CommandInteraction) => Promise<void>
    }
  >
}
