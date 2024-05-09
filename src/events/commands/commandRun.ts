import { Message } from 'discord.js';
import BaseEvent from '../../structures/baseEvent';
import { MessageContext } from '../../structures/context';
import { createGuild, fetchGuild } from '../../database/guild';
import { CommandOptionType, CommandSchema } from '../../structures/baseCommand';

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

        let command =
            this.client.commands.get(commandName) ||
            this.client.commands.find((cmd) =>
                cmd.data.aliases.includes(commandName),
            );
        if (!command) return;

        const ctx = new MessageContext(this.client, message, args);
        ctx.prefixes = prefixes;

        const detectedFlags: string[] = [];

        for (const arg of args) {
            if (arg.startsWith('--')) {
                const flagName = arg.substring(2);
                const isValidFlag = /^[a-zA-Z]+$/.test(flagName);

                if (isValidFlag) {
                    detectedFlags.push(flagName);
                    args.splice(args.indexOf(arg), 1);
                }
            }
        }

        ctx.flags = detectedFlags;

        for (const arg of args) {
            const subcommand =
                command.data?.commands?.find(
                    (cmd: CommandSchema) => cmd.name === arg,
                ) ||
                command.data?.commands?.find((cmd: CommandSchema) =>
                    cmd.aliases?.includes(arg),
                );

            if (subcommand) {
                command = subcommand;
                args.shift();
            } else break;
        }

        if (command.data?.permissions) {
            const hasPermission = command?.data.permissions.some((perm) =>
                ctx.message.member?.permissions.has(perm),
            );

            if (!hasPermission)
                return ctx.say(
                    `you do not have permission to run this command\n- required permissions:${command.data.permissions
                        .map((perm) => perm.replace(/([A-Z])/g, ' $1'))
                        .join(', ')}`,
                );
        }

        if (command.data?.options || command?.options) {
            const options = command?.data?.options || command?.options;

            for (const option of options) {
                const arg = args.shift();

                const usage = options
                    .map((option) =>
                        option.required
                            ? `<${option.name}>`
                            : `[${option.name}]`,
                    )
                    .join(' ');

                const fullCommandName = `${prefixUsed}${commandName} ${
                    command?.name || ''
                } ${usage}`.trim();

                if (!arg && option.required) {
                    return ctx.say(
                        `missing required argument: ${option.name}\n- usage: ${fullCommandName}`,
                    );
                }

                if (arg) {
                    switch (option.type) {
                        case CommandOptionType.String:
                            ctx.options[option.name] = `${arg} ${args.join(
                                ' ',
                            )}`.trimEnd();
                            break;
                        case CommandOptionType.Integer:
                            ctx.options[option.name] = parseInt(arg);
                            break;
                        case CommandOptionType.Boolean:
                            const allowed = [
                                'yes',
                                'true',
                                'y',
                                '1',
                                'no',
                                'false',
                                'n',
                                '0',
                            ];

                            if (!allowed.includes(arg.toLowerCase())) {
                                return ctx.say(
                                    `argument at position ${
                                        args.indexOf(arg) + 1
                                    } is not a valid boolean`,
                                );
                            }

                            ctx.options[option.name] =
                                allowed.indexOf(arg.toLowerCase()) < 4;
                            break;
                        case CommandOptionType.User:
                            ctx.options[option.name] = await ctx.resolveUser(
                                `${arg} ${args.join(' ')}`.trimEnd(),
                            );
                            break;
                        case CommandOptionType.Member:
                            ctx.options[option.name] = await ctx.resolveMember(
                                `${arg} ${args.join(' ')}`.trimEnd(),
                            );
                            break;
                        case CommandOptionType.Channel:
                            ctx.options[option.name] = await ctx.resolveChannel(
                                `${arg} ${args.join(' ')}`.trimEnd(),
                            );
                            break;
                        case CommandOptionType.Role:
                            ctx.options[option.name] = await ctx.resolveRole(
                                `${arg} ${args.join(' ')}`.trimEnd(),
                            );
                            break;
                        case CommandOptionType.Server:
                            ctx.options[option.name] = await ctx.resolveGuild(
                                `${arg} ${args.join(' ')}`.trimEnd(),
                            );
                            break;
                    }
                }
            }
        }

        const checkResult = command?.check ? await command.check(ctx) : true;
        if (!checkResult) return;

        await command.run(ctx);
    }
}
