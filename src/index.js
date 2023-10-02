const { readdirSync } = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { token } = require("../config").default;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = readdirSync(commandsPath).filter((file) =>
  file.endsWith(".js")
);

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

client.once("ready", (client) => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  console.log(
    `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
  );

  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

start();

async function start() {
  client.login(token);
}
