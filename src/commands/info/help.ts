import { EmbedBuilder } from 'discord.js';
import BaseCommand, { CommandOptionType } from '../../structures/baseCommand';
import { MessageContext } from '../../structures/context';

export default class HelpCommand extends BaseCommand {
    constructor() {
        super({
            name: 'help',
            description: 'showing help related to the bot',
            aliases: ['commands', 'cmds', 'command', 'cmd'],
            options: [
                {
                    name: 'command',
                    description: 'The command to get help for',
                    type: CommandOptionType.String,
                    required: false,
                },
            ],
        });
    }

    /**
     * This command contains placeholder links because
     * the project is not yet released.
     */

    public async run(ctx: MessageContext): Promise<any> {
        const commandName = ctx.options?.command as string | undefined;

        if (commandName) {
            const command =
                ctx.client.commands.get(commandName) ||
                ctx.client.commands.find((cmd) =>
                    cmd.data.aliases.includes(commandName),
                ) ||
                ctx.client.commands.find((cmd) =>
                    cmd.data.commands?.find(
                        (c) =>
                            c.name === commandName ||
                            c.aliases?.includes(commandName),
                    ),
                );

            if (!command) {
                return ctx.say('Command not found');
            }

            const embed = new EmbedBuilder()
                .setColor(ctx.client.config.colors.transparent)
                .setAuthor({
                    name: ctx.author.username,
                    iconURL: ctx.author.avatarURL()!,
                })
                .setTitle(`Charmer Command - ${command.data.name}`)
                .setURL('https://google.com/')
                .setDescription(command.data.description);

            if (command.data.aliases) {
                embed.addFields([
                    {
                        name: 'Aliases',
                        value: command.data.aliases.join(', '),
                    },
                ]);
            }

            if (command.data.options) {
                const options = command.data.options.map((option) => {
                    return `${option.required ? '<' : '['}${option.name}${
                        option.required ? '>' : ']'
                    }`;
                });

                embed.addFields([
                    {
                        name: 'Usage',
                        value: `${command.data.name} ${options.join(' ')}`,
                    },
                ]);
            }

            if (command.data.permissions) {
                embed.addFields([
                    {
                        name: 'Permissions',
                        value: command.data.permissions
                            .map((perm) => perm.replace(/([A-Z])/g, ' $1'))
                            .join(', ')
                            .trim(),
                    },
                ]);
            }

            let pages = [embed];

            if (command.data.commands) {
                const commands = command.data.commands.map((cmd) => cmd.name);
                embed.addFields([
                    {
                        name: 'Subcommands',
                        value: commands.map((cmd) => `- ${cmd}`).join('\n'),
                    },
                ]);

                pages = [
                    embed,
                    ...command.data.commands.map((cmd) => {
                        const embed = new EmbedBuilder()
                            .setColor(ctx.client.config.colors.transparent)
                            .setAuthor({
                                name: ctx.author.username,
                                iconURL: ctx.author.avatarURL()!,
                            })
                            .setTitle(
                                `Charmer Command - ${command.data.name} ${cmd.name}`,
                            )
                            .setURL('https://google.com/')
                            .setDescription(cmd.description);

                        if (cmd.aliases) {
                            embed.addFields([
                                {
                                    name: 'Aliases',
                                    value: cmd.aliases.join(', '),
                                },
                            ]);
                        }

                        if (cmd.options) {
                            const options = cmd.options.map((option) => {
                                return `${option.required ? '<' : '['}${
                                    option.name
                                }${option.required ? '>' : ']'}`;
                            });

                            embed.addFields([
                                {
                                    name: 'Usage',
                                    value: `${command.data.name} ${
                                        cmd.name
                                    } ${options.join(' ')}`,
                                },
                            ]);
                        }

                        return embed;
                    }),
                ];
            }

            return ctx.paginate(pages);
        }

        const commandsCategorized = ctx.client.commands.reduce(
            (acc, command) => {
                const category = command.data.category;
                acc[category] = acc[category] || [];
                acc[category].push(command);
                return acc;
            },
            {},
        );

        const embed = new EmbedBuilder()
            .setColor(ctx.client.config.colors.transparent)
            .setTitle('Charmer Modules')
            .setURL('https://google.com/')
            .setAuthor({
                name: ctx.author.username,
                iconURL: ctx.author.avatarURL()!,
            })
            .setDescription(
                'For more info visit [Charmer Docs](https://google.com/) or join our [Discord Server](https://google.com/)\n\nCharmer is a open-source discord bot built with discord.js, if you want to contribute to the project, visit our [GitHub Organization](https://google.com/)',
            );

        const pages = [embed];

        for (const [category, commands] of Object.entries(
            commandsCategorized,
        )) {
            const description = (commands as BaseCommand[])
                .map((command) => `${command.data.name}`)
                .join(', ');

            const embed = new EmbedBuilder()
                .setColor(ctx.client.config.colors.transparent)
                .setAuthor({
                    name: ctx.author.username,
                    iconURL: ctx.author.avatarURL()!,
                })
                .setTitle(`Charmer Modules - ${category}`)
                .setURL('https://google.com/')
                .setDescription(description);

            pages.push(embed);
        }

        return ctx.paginate(pages);
    }
}
