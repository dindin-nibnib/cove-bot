import { SlashCommandBuilder } from "@discordjs/builders";
import Discord = require("discord.js");
import Discordx = require("discordx");

// Redeclares Client in order to add a collection of commands
class Client extends Discordx.Client {
	commands = new Discord.Collection();
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("fas")
		.setDescription("Flip a sparky!"),

	async execute(
		interaction: Discord.CommandInteraction<Discord.CacheType>,
		client: Client
	) {
		Math.random() < 0.499
			? interaction.reply({
				embeds: [
					new Discord.MessageEmbed()
						.setTitle("Sparky flip")
						.setDescription("Heads!")
						.setImage("https://imgur.com/xISpzpm.png")
				]
			})
			: Math.random() > 0.5001
				? interaction.reply({
					embeds: [
						new Discord.MessageEmbed()
							.setTitle("Sparky flip")
							.setDescription("Tails!")
							.setImage("https://imgur.com/US0Rf4H.png")
					]
				})
				: interaction.reply({
					embeds: [
						new Discord.MessageEmbed()
							.setTitle("Sparky flip")
							.setDescription("It landed on its side!")
					]
				});
	},
};
