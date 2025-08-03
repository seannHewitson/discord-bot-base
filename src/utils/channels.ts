import { Client } from 'discord.js'

export const getChannel = (client: Client<true>, channelId: string) => {
  const channel = client.channels.cache.get(channelId)
  if (!channel) {
    console.error(`Channel with ID ${channelId} not found.`)
    return null
  }
  if (!channel.isTextBased()) {
    console.error(`Channel with ID ${channelId} is not a text-based channel.`)
    return null
  }
  if (!channel.isSendable()) {
    console.error(`Channel with ID ${channelId} is not sendable.`)
    return null
  }
  return channel
}
