import { Collection, Events, Interaction, MessageFlags } from 'discord.js'

export const name = Events.InteractionCreate

type NewInteraction = Interaction & {
  client: Interaction['client'] & {
    commands: Collection<string, any>
  }
}

export const execute = async (interaction: NewInteraction) => {
  if (!interaction.isChatInputCommand()) return

  const command = interaction.client.commands.get(interaction.commandName)

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`)
    return
  }

  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'There was an error while executing this command!',
        flags: MessageFlags.Ephemeral,
      })
    } else {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        flags: MessageFlags.Ephemeral,
      })
    }
  }
}
