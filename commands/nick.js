const Command = require('../Command');

module.exports = class Nick extends Command {
	constructor() {
		super();

		this.name = 'nick';
		this.description = 'Sets the nickname of a server member.';
		this.group = 'Management';

		this.permissionsRequired = {
			bot: ['manageNicknames'],
			user: ['manageNicknames'],
			guildOnly: true
		};

		this.usage = '<set/reset> <user mention>';
	}

	async execute({bot, msg, args, say}) {
		if (args.length === 0) {
			await say('Usage: `nick <set/reset> <user mention>`');
		} else {
			let option = args.shift();
			if (option === 'set') {
				if (args.length < 2)
					return await say(
						'Usage: `nick <set/reset> <user mention> <nickname>`'
					);
				let member = msg.guild.members.find(m => m.id === msg.mentions[0].id);

				if (
					member.punishable(msg.guild.members.find(m => m.id === bot.user.id))
				) {
					args.shift(); // remove mention

					await member.edit({
						nick: args.join(' ')
					});

					await say(
						member.username +
							"'s nickname has been updated to `" +
							args.join(' ') +
							'`.'
					);
				} else {
					await say(
						"I cannot edit that user's nickname. Make sure my highest role is above that of the user whose nickname you're trying to edit!"
					);
				}
			} else if (option === 'reset') {
				if (args.length < 1)
					return await say('You need to provide the mention!');
				let member = msg.guild.members.find(m => m.id === msg.mentions[0].id);

				if (
					member.punishable(msg.guild.members.find(m => m.id === bot.user.id))
				) {
					await member.edit({
						nick: ''
					});

					await say(member.username + "'s nickname has been reset.");
				} else {
					await say(
						"I cannot edit that user's nickname. Make sure my highest role is above that of the user whose nickname you're trying to edit!"
					);
				}
			} else {
				await say('Invalid first argument! `nick <set/reset>`');
			}
		}
	}
};
