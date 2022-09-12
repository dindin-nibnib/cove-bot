import { SlashCommandBuilder } from "@discordjs/builders";
import Discord = require("discord.js");
import Discordx = require("discordx");
import { codex } from "../data.json";

// Redeclares Client in order to add a collection of commands
class Client extends Discordx.Client {
	commands = new Discord.Collection();
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("codex")
		.setDescription("Gives a random codex entry"),

	async execute(
		interaction: Discord.CommandInteraction<Discord.CacheType>,
		client: Client
	) {

	},
};
