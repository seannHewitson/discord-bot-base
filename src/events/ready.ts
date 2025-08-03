import {
  REALTIME_LISTEN_TYPES,
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT,
  RealtimePostgresChangesFilter,
} from '@supabase/supabase-js'
import { Client, ClientEvents } from 'discord.js'

import { supabase } from '../supabase'
import { getFiles } from '../utils/file'

export const name: keyof ClientEvents = 'ready'
export const once = true

export function execute(client: Client) {
  console.log(`🤖 Logged in as ${client.user?.tag}`)

  getFiles('subscriptions').then((files) => {
    files.forEach((file) => {
      if ('table' in file && 'execute' in file) {
        console.log(`📅 Registering subscription on ${file.table}.`)
        let event = REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.INSERT
        if ('event' in file) {
          event = file.event
        }
        supabase
          .channel(`realtime:${file.table}`)
          .on(
            REALTIME_LISTEN_TYPES.POSTGRES_CHANGES,
            {
              event,
              schema: 'public',
              table: file.table,
            } as RealtimePostgresChangesFilter<any>,
            (payload) => file.execute(payload, client)
          )
          .subscribe((status, err) => {
            console.log(`Subscription ${file.table} status: ${status}`)
            if (err) {
              console.error(`Subscription ${file.table} error: ${err.message}`)
            }
          })
      }
    })
  })
}
