import { EmbedBuilder } from 'discord.js'

import { config } from '../config'
import { SubscriptionEvent, Tables } from '../types'
import { getChannel } from '../utils/channels'

export const table: keyof Tables = 'players'

export const execute: SubscriptionEvent<'players'> = async (
  payload,
  client
) => {
  const channel = getChannel(client, config.channels.announcements)
  if (!channel) return

  await channel.send({
    content: `A new player has just registered!`,
    embeds: [
      new EmbedBuilder()
        .setColor('#00ff99')
        .addFields([
          {
            name: 'First Name',
            value: payload.new.firstname || 'N/A',
            inline: true,
          },
          {
            name: 'Last Name',
            value: payload.new.lastname || 'N/A',
            inline: true,
          },
        ])
        .setTimestamp(),
    ],
  })
}
