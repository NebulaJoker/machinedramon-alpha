'use strict';

// Require the necessary discord.js classes
const { Client, Intents, CommandInteractionOptionResolver } = require('discord.js');
const { token, serverURL } = require('./config.json');
const machinedramon = require('./custom_modules/machinedramon_omega')

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES] });

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    // const fetchUser = await client.users.fetch(interaction.user.id);
    switch (commandName) {
        case 'add-want': {
            const result = await machinedramon.addWant(interaction.options._hoistedOptions, interaction.user.id);
            await interaction.reply(result);
            return;
        };
        case 'add-have': {
            const result = await machinedramon.addHave(interaction.options._hoistedOptions, interaction.user.id);
            await interaction.reply(result);
            return;
        };
        case 'delete-want': {
            const result = await machinedramon.deleteWant(interaction.options._hoistedOptions[0].value, interaction.user.id);
            await interaction.reply(result);
            return;
        };
        case 'delete-have': {
            const result = await machinedramon.deleteHave(interaction.options._hoistedOptions[0].value, interaction.user.id);
            await interaction.reply(result);
            return;
        };
        case 'update-want': {
            const result = await machinedramon.updateWant(interaction.options._hoistedOptions, interaction.user.id);
            await interaction.reply(result);
            return;
        };
        case 'update-have': {
            const result = await machinedramon.updateHave(interaction.options._hoistedOptions, interaction.user.id);
            await interaction.reply(result);
            return;
        };
        case 'start-tournament':{
            console.log(interaction.options._hoistedOptions);
            await interaction.reply("Check the console.")
            return;
        };
        default: null;
    }

});



client.once('ready', () => {
    console.log('Machinedramon Alpha, moving out!');
});

client.login(token);
