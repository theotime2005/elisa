require('dotenv').config();
if (!process.env.GPT_KEY || !process.env.BOT_TOKEN) {
    console.log("Il manque une variable d'environnement.");
    process.exit();
}
const { Client, GatewayIntentBits, shouldUseGlobalFetchAndWebSocket} = require('discord.js');
const gpt = require('./gpt.js');
const {quiet} = require("nodemon/lib/utils");

// Configuration des intents nécessaires pour recevoir et envoyer des messages
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, // Nécessaire pour les actions de base dans les serveurs
        GatewayIntentBits.GuildMessages, // Pour recevoir et envoyer des messages dans les serveurs
        GatewayIntentBits.MessageContent, // Pour accéder au contenu des messages
    ]
});

client.on('ready', () => {
    console.log('Client disponible.');
});

client.on('messageCreate', async message => {
    if (message.mentions.has(client.user)) {
        const sender = message.author.id;
        const content = message.content;
        try {
            const completion = await gpt.ask_gpt(content);
            message.reply(`<@${sender}> ${completion}`);
        } catch (e) {
            message.reply(`<@${sender}> Une erreur s'est produite, je n'ai pas réussi à te répondre!`);
            console.error(e);
        }
    }
});

// Connexion du bot en utilisant le token du bot
client.login(process.env.BOT_TOKEN);
