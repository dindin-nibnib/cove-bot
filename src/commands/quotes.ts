import { SlashCommandBuilder } from "@discordjs/builders";
import Discord = require("discord.js");
import Discordx = require("discordx");

// Redeclares Client in order to add a collection of commands
class Client extends Discordx.Client {
  commands = new Discord.Collection();
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quotes")
    .setDescription("Reads a random quote from warframe's Ordis!"),

  async execute(
    interaction: Discord.CommandInteraction<Discord.CacheType>,
    client: Client
  ) {
		const {quotes} = require("../data/generic.json") as {quotes: string[]}
    
  },
};
