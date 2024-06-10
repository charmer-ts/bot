import { EmbedBuilder } from 'discord.js';
import BaseCommand, { CommandOptionType } from '../../structures/baseCommand';
import { MessageContext } from '../../structures/context';

export default class MembersCommand extends BaseCommand {
    constructor() {
        super({
            name: 'members',
            aliases: ['users'],
            description:
                'get the members of the server\n- filters: `show:bots`, `show:humans`, `show:admins`, `sortby:created`',
            permissions: ['ManageGuild'],
            options: [
                {
                    name: 'filters',
                    description: 'the filters to apply',
                    type: CommandOptionType.String,
                    required: false,
                },
            ],
        });
    }

    public filters = [
        'show:bots',
        'show:humans',
        'show:admins',
        'sortBy:created',
    ];

    public async run(ctx: MessageContext) {
        await ctx.message.guild?.members.fetch().catch(() => null);
        let members = ctx.message.guild?.members.cache.toJSON();

        if (!members || members.length === 0) {
            return ctx.say('No members found in this server! 😢');
        }

        const filters = ctx.options?.filters as string | undefined;
        const filtersArray = filters?.split(' ');

        for (const filter of filtersArray || []) {
            switch (filter) {
                case 'show:bots': {
                    members = members.filter((m) => m.user.bot);
                    break;
                }

                case 'show:humans': {
                    members = members.filter((m) => !m.user.bot);
                    break;
                }

                case 'show:admins':
                case 'show:admin': {
                    members = members.filter(
                        (m) =>
                            m.permissions.has('ManageGuild') ||
                            m.permissions.has('Administrator'),
                    );
                    break;
                }

                case 'sortby:created': {
                    members = members.sort(
                        (a, b) =>
                            a.user.createdTimestamp - b.user.createdTimestamp,
                    );
                    break;
                }
            }
        }

        if (members.length === 0) {
            return ctx.say('No members found with the specified filters!');
        }

        const chunkSize = 10;
        const embeds: EmbedBuilder[] = [];

        for (let i = 0; i < members.length; i += chunkSize) {
            const chunk = members.slice(i, i + chunkSize);

            const embed = new EmbedBuilder()
                .setColor(ctx.client.config.colors.transparent)
                .setAuthor({
                    name: ctx.author.username,
                    iconURL: ctx.author.avatarURL()!,
                })
                .setTitle(`Members of ${ctx.message.guild?.name}`)
                .setDescription(
                    `Applied filters: ${filtersArray?.join(', ') || 'none'}`,
                )
                .addFields([
                    {
                        name: `** **`,
                        value: chunk
                            .slice(0, 5)
                            .map((m) => `- ${m.user.username}`)
                            .join('\n'),
                        inline: true,
                    },
                ]);

            if (chunk.length > 5) {
                embed.addFields([
                    {
                        name: '** **',
                        value: chunk
                            .slice(5, 10)
                            .map((m) => `- ${m.user.username}`)
                            .join('\n'),
                        inline: true,
                    },
                ]);
            }

            embeds.push(embed);
        }

        return ctx.paginate(embeds);
    }
}
