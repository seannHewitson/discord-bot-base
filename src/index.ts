import 'dotenv/config'

import { Collection } from 'discord.js'

import { discordClient } from './client'
import { config } from './config'
import { deploy } from './deploy'
import { getFiles } from './utils/file'

getFiles('events').then((files) => {
  files.forEach((file) => {
    if ('name' in file && 'execute' in file) {
      const { name, execute } = file
      const method =
        'once' in file ? (file.once === true ? 'once' : 'on') : 'on'
      discordClient[method](name, (...args) => execute(...args))
      console.log(`🔧 Event ${name} loaded.`)
      discordClient.once
    }
  })
})

getFiles('commands').then(async (files) => {
  const commands = new Collection<string, (...args: any[]) => Promise<void>>()

  files.forEach((file) => {
    if ('data' in file && 'execute' in file) {
      const { data, execute } = file as any
      // @ts-expect-error
      commands.set(data.name, { data, execute })
    }
  })

  console.log(`🔧 ${commands.size} commands loaded.`)
  await deploy(commands)
  return commands
})

discordClient.login(config.discord.token)
