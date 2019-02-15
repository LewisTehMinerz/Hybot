const Command = require('../Command');

module.exports = class AFKMessage extends Command {
	constructor() {
		super();

		this.name = 'afkmessage';
		this.description = 'Toggles the AFK message.';
		this.group = 'Management';

		this.permissionsRequired = {
			user: ['administrator'],
			bot: []
		};
	}

	async execute({msg, say, db, guildInfo}) {
		let guild = db.collection('guild');

		await guild.updateOne(
			{guildId: msg.channel.guild.id},
			{$set: {afk_back: !guildInfo.afk_back}}
		);

		await say(
			'Welcome back messages are now ' +
				(!guildInfo.afk_back ? 'on' : 'off') +
				'.'
		);
	}
};
