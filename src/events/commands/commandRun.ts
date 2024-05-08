import { Message } from 'discord.js';
import BaseEvent from '../../structures/baseEvent';
import { MessageContext } from '../../structures/context';
import { createGuild, fetchGuild } from '../../database/guild';

export default class CommandRunEvents extends BaseEvent {
    async on_messageCreate(message: Message<boolean>) {
        if (message.author.bot) return;
        if (!message.guildId) return;

        let guildInfo = await fetchGuild(message.guildId);

        if (!guildInfo) {
            const guildObject = await this.client.guilds.fetch(message.guildId);

            guildInfo = await createGuild(message.guildId, {
                name: guildObject.name,
                owner: guildObject.ownerId,
                icon: guildObject.iconURL() || undefined,
                banner: guildObject.bannerURL() || undefined,
            });
        }

        const prefixes = guildInfo!.prefixes;
        if (!prefixes) return;

        const prefixUsed = prefixes.find((prefix) =>
            message.content.startsWith(prefix),
        );
        if (!prefixUsed) return;

        const args = message.content
            .slice(prefixUsed.length)
            .trim()
            .split(/ +/);
        const commandName = args.shift()?.toLowerCase();

        if (!commandName) return;

        const command =
            this.client.commands.get(commandName) ||
            this.client.commands.find((cmd) =>
                cmd.data.aliases.includes(commandName),
            );
        if (!command) return;

        const ctx = new MessageContext(this.client, message, args);

        if (command.data?.permissions) {
            const hasPermission = command.data.permissions.some((perm) =>
                ctx.message.member?.permissions.has(perm),
            );

            if (!hasPermission)
                return ctx.say(
                    `you do not have permission to run this command: ${command.data.permissions.join(
                        ', ',
                    )}`,
                );
        }

        const checkResult = command?.check ? await command.check(ctx) : true;
        if (!checkResult) return;

        await command.run(ctx);
    }
}
