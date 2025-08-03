import { config as env } from 'dotenv'

env()

export const config = {
  env: process.env.NODE_ENV || 'development',
  channels: {
    announcements: process.env.DISCORD_CHANNEL_ANNOUNCEMENT as string,
    commands: process.env.DISCORD_CHANNEL_COMMANDS as string,
    logs: process.env.DISCORD_CHANNEL_LOGS as string,
  },
  discord: {
    clientId: process.env.DISCORD_CLIENT_ID as string,
    guildId: process.env.DISCORD_GUILD_ID as string,
    token: process.env.DISCORD_BOT_TOKEN as string,
  },
  supabase: {
    anon: process.env.SUPABASE_ANON as string,
    url: process.env.SUPABASE_URL as string,
    service_role: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  },
}
