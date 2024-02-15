const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('add-want').setDescription('Tags a card as a want.')
		.addStringOption(option => option.setName('card_id')
			.setDescription("ID of the card to add, in the format BT#-###.")
			.setRequired(true))
		.addIntegerOption(option => option.setName('quantity')
			.setDescription("Number of copies you are looking for.")
			.setRequired(true)),

	new SlashCommandBuilder().setName('add-have').setDescription('Tags a card as a have.')
		.addStringOption(option => option.setName('card_id')
			.setDescription("ID of the card to add, in the format BT#-###.")
			.setRequired(true))
		.addIntegerOption(option => option.setName('quantity')
			.setDescription("Number of copies you have.")
			.setRequired(true)),

	new SlashCommandBuilder().setName('delete-have').setDescription('Deletes a card tagged as a have.')
		.addStringOption(option => option.setName('card_id')
			.setDescription("ID of the card to delete, in the format BT#-###.")
			.setRequired(true)),

	new SlashCommandBuilder().setName('delete-want').setDescription('Deletes a card tagged as a want.')
		.addStringOption(option => option.setName('card_id')
			.setDescription("ID of the card to delete, in the format BT#-###.")
			.setRequired(true)),

	new SlashCommandBuilder().setName('update-want').setDescription('Updates the number of copies that you want from this card.')
		.addStringOption(option => option.setName('card_id')
			.setDescription("ID of the card to update, in the format BT#-###.")
			.setRequired(true))
		.addIntegerOption(option => option.setName('quantity')
			.setDescription("Number of copies you are looking for.")
			.setRequired(true)),

	new SlashCommandBuilder().setName('update-have').setDescription('Updates the number of copies that you have from this card.')
		.addStringOption(option => option.setName('card_id')
			.setDescription("ID of the card to update, in the format BT#-###.")
			.setRequired(true))
		.addIntegerOption(option => option.setName('quantity')
			.setDescription("Number of copies you have.")
			.setRequired(true)),

	new SlashCommandBuilder().setName('start-tournament').setDescription('Starts a new tournament.')
		.addStringOption(option => option.setName('date')
			.setDescription("Date for the tournament. Must be in DD.MM.YYYY format")
			.setRequired(true))
		.addStringOption(option => option.setName('store')
			.setDescription("Name of the store organizing the tournament.")
			.setRequired(true)
			.addChoice('Arena Porto', 'Arena Porto')
			.addChoice('Smart Move Games', 'Smart Move Games'))
		.addBooleanOption(option => option.setName('remote')
			.setDescription("If the tournament is remote then this option must be checked.")
			.setRequired(true))
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	console
	try {
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	}
})();
