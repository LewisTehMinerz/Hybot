const Command = require('../Command');

module.exports = class Info extends Command {
	constructor() {
		super();

		this.name = 'info';
		this.description = 'Information about Hybot!';
		this.group = 'Utility';
	}

	async execute({bot, msg}) {
		await msg.channel.createMessage('This would be some info!');
	}
};
