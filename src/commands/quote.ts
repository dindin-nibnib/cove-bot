import { SlashCommandBuilder } from "@discordjs/builders";
import Discord = require("discord.js");
import Discordx = require("discordx");
import { randInt } from "../lib/utilities";

// Redeclares Client in order to add a collection of commands
class Client extends Discordx.Client {
	commands = new Discord.Collection();
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("quote")
		.setDescription("Reads a random quote from warframe's Ordis!"),

	async execute(
		interaction: Discord.CommandInteraction<Discord.CacheType>,
		client: Client
	) {
		const { quotes } = require("../data/generic.json") as { quotes: string[]; };
		const quote = quotes[randInt(0, quotes.length - 1)];

		await interaction.reply({
			embeds: [
				new Discord.MessageEmbed().setDescription(quote).setAuthor({ name: "Ordis" }).setColor("BLUE"),
			]
		});
	},
};
