import { SlashCommandBuilder } from "@discordjs/builders";
import Discord = require("discord.js");
import Discordx = require("discordx");
import { codex } from "../data.json";
import { randInt } from "../lib/utilities";

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
		const entry = codex[randInt(0, codex.length - 1)];
		interaction.reply({
			embeds: [
				new Discord.MessageEmbed()
					.setTitle("Codex entry")
					.setDescription("Ordis chose the " + entry.name + " for you. It's a " + entry.faction + "!")
					.setImage(entry.image + ".png")
			]
		});
	},
};
