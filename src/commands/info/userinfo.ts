import { EmbedBuilder, GuildMember, User } from 'discord.js';
import BaseCommand, { CommandOptionType } from '../../structures/baseCommand';
import { MessageContext } from '../../structures/context';

export default class UserinfoCommand extends BaseCommand {
    constructor() {
        super({
            name: 'userinfo',
            description: 'get information about a user',
            aliases: ['user', 'whois', 'ui'],
            options: [
                {
                    name: 'user',
                    description: 'the user to get information about',
                    type: CommandOptionType.User,
                    required: false,
                },
            ],
        });
    }

    public async run(ctx: MessageContext) {
        const user: User = ctx.options?.user || ctx.author;
        const member: GuildMember | null =
            ctx.message.guild?.members.cache.get(user.id) || null;

        // Fetch the user's banner if it's not cached
        if (!user.banner) {
            await user.fetch();
        }

        const embed_basicInfo = new EmbedBuilder()
            .setColor(ctx.client.config.colors.transparent)
            .setAuthor({
                name: ctx.author.username,
                iconURL: ctx.author.avatarURL()!,
            })
            .setTitle(`User Information - ${user.username}`)
            .setThumbnail(user.avatarURL()!)
            .setImage(user.bannerURL({ size: 512 }) || null)
            .setDescription(`id: ${user.id}`)
            .addFields([
                {
                    name: 'Basic',
                    value: [
                        `- username: ${user.username}`,
                        `- created: <t:${Math.floor(
                            user.createdTimestamp / 1000,
                        )}:R>`,
                        `- type: ${user.bot ? 'bot' : 'user'}`,
                    ].join('\n'),
                },
            ]);

        // Charmer Specific Information
        embed_basicInfo.addFields([
            {
                name: 'Charmer',
                value: [
                    `- mutual guilds: ${
                        ctx.client.guilds.cache.filter((guild) =>
                            guild.members.cache.has(user.id),
                        ).size
                    }`,
                ].join('\n'),
            },
        ]);

        const embeds = [embed_basicInfo];

        if (member) {
            const embed_memberInfo = new EmbedBuilder()
                .setColor(ctx.client.config.colors.transparent)
                .setAuthor({
                    name: ctx.author.username,
                    iconURL: ctx.author.avatarURL()!,
                })
                .setTitle(`User Information - ${member.user.username}`)
                .setThumbnail(member.user.avatarURL()!)
                .setDescription(`id: ${member.id}`)
                .addFields([
                    {
                        name: 'Guild',
                        value: [
                            `- nickname: ${member.nickname || 'none'}`,
                            `- joined: <t:${Math.floor(
                                member.joinedTimestamp! / 1000,
                            )}:R>`,
                            `- roles: ${
                                member.roles.cache.size === 1
                                    ? 'none'
                                    : member.roles.cache.filter(
                                          (role) => role.name !== '@everyone',
                                      ).size
                            }`,
                        ].join('\n'),
                    },
                    {
                        name: 'Roles',
                        value:
                            member.roles.cache.size === 1
                                ? 'none'
                                : member.roles.cache
                                      .filter(
                                          (role) => role.name !== '@everyone',
                                      )
                                      .sort((a, b) => b.position - a.position)
                                      .map((role) => `<@&${role.id}>`)
                                      .slice(0, 10)
                                      .join(', ')
                                      .concat(
                                          member.roles.cache.size > 10
                                              ? ` (+${
                                                    member.roles.cache.filter(
                                                        (role) =>
                                                            role.name !==
                                                            '@everyone',
                                                    ).size - 10
                                                } more)`
                                              : '',
                                      ),
                    },
                ]);

            embeds.push(embed_memberInfo);
        }

        const embed_links = new EmbedBuilder()
            .setColor(ctx.client.config.colors.transparent)
            .setAuthor({
                name: ctx.author.username,
                iconURL: ctx.author.avatarURL()!,
            })
            .setTitle(`User Information - ${user.username}`)
            .setThumbnail(user.avatarURL()!)
            .setDescription(`id: ${user.id}`)
            .addFields([
                {
                    name: 'Links',
                    value: [
                        `- [profile](https://discord.com/users/${user.id})`,
                        `- [avatar](${user.avatarURL()})`,
                        `- ${
                            user.banner
                                ? `[banner](${user.bannerURL()})`
                                : 'banner'
                        }`,
                    ].join('\n'),
                },
            ]);
            
        embeds.push(embed_links);

        return ctx.paginate(embeds);
    }
}
