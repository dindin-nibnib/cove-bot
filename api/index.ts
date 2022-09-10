import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from "discord-interactions";
import getRawBody from "raw-body";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const INVITE_COMMAND = {
  name: "Invite",
  description: "Get an invite link to add the bot to your server",
};

const HI_COMMAND = {
  name: "Hi",
  description: "Say hello!",
};

const BLEP_COMMAND = {
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

const INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${process.env.APPLICATION_ID}&scope=applications.commands`;

module.exports = async (request: VercelRequest, response: VercelResponse) => {
  // Only respond to POST requests
  if (request.method === "POST") {
    // Verify the request
    const signature = request.headers["x-signature-ed25519"] as
      | string
      | Buffer
      | Uint8Array
      | ArrayBuffer;
    const timestamp = request.headers["x-signature-timestamp"] as
      | string
      | Buffer
      | Uint8Array
      | ArrayBuffer;
    const rawBody = await getRawBody(request);
    console.log("gotRawBody");

    if (!process.env.PUBLIC_KEY)
      return response
        .status(500)
        .send("Missing PUBLIC_KEY environment variable");

    if (!signature)
      return response.status(400).send("Missing X-Signature-Ed25519 header");

    if (!timestamp)
      return response.status(400).send("Missing X-Signature-Timestamp header");

    const isValidRequest = verifyKey(
      rawBody,
      signature,
      timestamp,
      process.env.PUBLIC_KEY
    );

    if (!isValidRequest) {
      console.error("Invalid Request");
      return response.status(401).send({ error: "Bad request signature " });
    }

    // Handle the request
    const message = request.body;

    // Handle PINGs from Discord
    if (message.type === InteractionType.PING) {
      console.log("Handling Ping request");
      response.send({
        type: InteractionResponseType.PONG,
      });
    } else if (message.type === InteractionType.APPLICATION_COMMAND) {
      // Handle our Slash Commands
      switch (message.data.name.toLowerCase()) {
        case HI_COMMAND.name.toLowerCase():
          response.status(200).send({
            type: 4,
            data: {
              content: "Hello!",
            },
          });
          console.log("Slap Request");
          break;
        case INVITE_COMMAND.name.toLowerCase():
          response.status(200).send({
            type: 4,
            data: {
              content: INVITE_URL,
              flags: 64,
            },
          });
          console.log("Invite request");
          break;

        case BLEP_COMMAND.name.toLowerCase():
          response.status(200).send({
            type: 4,
            data: {
              content: "Blep!",
            },
          });
          console.log("Blep request");
          break;

        default:
          console.error("Unknown Command");
          response.status(400).send({ error: "Unknown Type" });
          break;
      }
    } else {
      console.error("Unknown Type");
      response.status(400).send({ error: "Unknown Type" });
    }
  } else {
    let url = `https://discord.com/api/v10/applications/${process.env.APPLICATION_ID}/commands`;

    // For authorization, you can use either your bot token
    let headers = {
      Authorization: "Bot " + process.env.BOT_TOKEN,
    };

    try {
      await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(INVITE_COMMAND),
      });
    } catch (e) {
      console.error(e);
    }

    // Respond to all other requests with a 404
    response.status(404).end();
    console.log("404");
  }
};
