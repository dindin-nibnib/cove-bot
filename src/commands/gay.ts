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
		.setName("gayrate")
		.setDescription("Rates you on how much of a gay pal you are."),

	async execute(
		interaction: Discord.CommandInteraction<Discord.CacheType>,
		client: Client
	) {
		let rating = 0;
		if (interaction.user.id === "592865976501141569")
			rating = randInt(98, 101);
		else if (interaction.user.id === "373515998000840714")
			rating = randInt(95, 101);
		else
			rating = randInt();

		await interaction.reply({
			embeds: [
				new Discord.MessageEmbed()
					.setTitle("Gay rating")
					.setDescription(`You're ${rating}% gay!`)
					.setColor("BLURPLE")
			]
		});
	},
};
