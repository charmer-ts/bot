import { EmbedBuilder } from 'discord.js';
import BaseCommand from '../../structures/baseCommand';
import { MessageContext } from '../../structures/context';

export default class HelpCommand extends BaseCommand {
    constructor() {
        super({
            name: 'help',
            description: 'showing help related to the bot',
            aliases: ['commands', 'cmds', 'command', 'cmd'],
        });
    }

    /**
     * This command contains placeholder links because
     * the project is not yet released.
     */

    public async run(ctx: MessageContext): Promise<any> {
        const commandsCategorized = ctx.client.commands.reduce((acc, command) => {
            const category = command.data.category;
            acc[category] = acc[category] || [];
            acc[category].push(command);
            return acc;
        }, {});

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

        for (const [category, commands] of Object.entries(commandsCategorized)) {
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
