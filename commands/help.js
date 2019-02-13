const Command = require('../Command');

module.exports = class Help extends Command {
	constructor() {
		super();

		this.name = 'help';
		this.description = 'Get help for commands!';
	}

	async execute({bot, msg, args, commands, guildInfo, say}) {
		const fields = [];

		for (let command of Object.keys(commands)) {
			let cmd = commands[command];
			let description = '';
			description += cmd.description;

			if (
				cmd.permissionsRequired.bot.length > 0 ||
				cmd.permissionsRequired.user.length > 0
			) {
				description += '\n**Required Permissions:**\n';

				if (cmd.permissionsRequired.bot.length > 0) {
					description +=
						'Bot: `' + cmd.permissionsRequired.bot.join('`, `') + '`\n';
				}

				if (cmd.permissionsRequired.user.length > 0) {
					description +=
						'User: `' + cmd.permissionsRequired.user.join('`, `') + '`';
				}
			}

			fields.push({
				name: guildInfo.prefix + cmd.name,
				value: description
			});
		}

		const chunked = fields.chunk(25);

		await say({
			embed: {
				title: 'Help',
				fields: chunked.shift()
			}
		});

		if (chunked.length > 0) {
			for (const fieldsExtra of chunked) {
				await say({
					embed: {
						fields: fieldsExtra
					}
				});
			}
		}
	}
};
