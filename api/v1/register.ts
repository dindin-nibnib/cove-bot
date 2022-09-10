import type { VercelRequest, VercelResponse } from "@vercel/node";
import dotenv from "dotenv";
dotenv.config();

export default async (request: VercelRequest, response: VercelResponse) => {
  let url =
    "https://discord.com/api/v10/applications/1018193172586831892/commands";

  //# This is an example CHAT_INPUT or Slash Command, with a type of 1
  const json = {
    name: "blep",
    type: 1,
    description: "Send a random adorable animal photo",
    options: [
      {
        name: "animal",
        description: "The type of animal",
        type: 3,
        required: true,
        choices: [
          {
            name: "Dog",
            value: "animal_dog",
          },
          {
            name: "Cat",
            value: "animal_cat",
          },
          {
            name: "Penguin",
            value: "animal_penguin",
          },
        ],
      },
      {
        name: "only_smol",
        description: "Whether to show only baby animals",
        type: 5,
        required: false,
      },
    ],
  };

  //# For authorization, you can use either your bot token
  const headers = {
    Authorization: "Bot " + process.env.BOT_TOKEN,
  };

  let bodyInit = JSON.stringify(json);
  let r = await fetch(url, { headers, body: bodyInit, method: "POST" });
};
