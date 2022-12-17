const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, Modal, TextInputComponent } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed-create')
		.setDescription('Create an embed message using Discord modals feature.'),
	async execute(client, interaction) {

		if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
			const embed = new MessageEmbed()
				.setDescription(`${config.emojis.stop} This slash command is only for the members who are having the permission **MANAGE_MESSAGES**.`)
				.setColor("RED");

			return interaction.reply({ embeds: [embed], ephemeral: true });
		};

		const modal = new Modal()
			.setCustomId('embed_creator_system')
			.setTitle('Create an embed message:');

		const input = new TextInputComponent()
			.setCustomId('embed_creator_system_author')
			.setLabel("Embed Author:")
			.setMaxLength(30)
			.setStyle('SHORT');

		const input1 = new TextInputComponent()
			.setCustomId('embed_creator_system_title')
			.setLabel("Embed Title:")
			.setPlaceholder("Example: This is an embed title!")
			.setMaxLength(30)
			.setStyle('SHORT');

		const input2 = new TextInputComponent()
			.setCustomId('embed_creator_system_description')
			.setLabel("Embed Description:")
			.setPlaceholder("Example: Epic embed description")
			.setRequired(true)
			.setStyle('PARAGRAPH');

		const input3 = new TextInputComponent()
			.setCustomId('embed_creator_system_footer')
			.setLabel("Embed Footer:")
			.setPlaceholder("Example: Created by T.F.A#7524")
			.setMaxLength(30)
			.setStyle('SHORT');

		const input4 = new TextInputComponent()
			.setCustomId('embed_creator_system_color')
			.setLabel("Embed Color:")
			.setPlaceholder("Example: RED")
			.setMaxLength(30)
			.setStyle('SHORT');

		const action = new MessageActionRow().addComponents(input);
		const action1 = new MessageActionRow().addComponents(input1);
		const action2 = new MessageActionRow().addComponents(input2);
		const action3 = new MessageActionRow().addComponents(input3);
		const action4 = new MessageActionRow().addComponents(input4);

		modal.addComponents(action, action1, action2, action3, action4);

		await interaction.showModal(modal);

	},
};