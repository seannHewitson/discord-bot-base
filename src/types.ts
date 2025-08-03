import { RealtimePostgresInsertPayload } from '@supabase/supabase-js'
import { Client } from 'discord.js'

import { Database } from './supabase/types'

export type Functions = Database['public']['Functions']

export type RealTime<T extends keyof Database['public']['Tables']> =
  RealtimePostgresInsertPayload<Tables[T]['Row']>

export type Tables = Database['public']['Tables']

export type SubscriptionEvent<T extends keyof Tables> = (
  payload: RealTime<T>,
  client: Client<true>
) => Promise<void>
