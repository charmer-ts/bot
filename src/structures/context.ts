import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    Message,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
} from 'discord.js';
import CoreClient from '../core/client';

interface SayOptions {
    oldMessage?: Message;
    clearContent?: boolean;
    clearComponents?: boolean;
}

export class MessageContext {
    public reply: (content: string | any) => Promise<Message>;
    public send: (content: string | any) => Promise<Message>;
    public author: Message['author'];

    public options = {} as Record<string, any>;
    public flags = [] as string[];
    public prefixes = [] as string[];

    constructor(
        public client: CoreClient,
        public message: Message,
        public args: string[],
    ) {
        this.reply = message.reply.bind(message);
        this.send = message.channel.send.bind(message.channel);
        this.author = message.author;
    }

    public async say(content: string | any, options?: SayOptions) {
        const embed = new EmbedBuilder()
            .setColor(this.client.config.colors.transparent)
            .setDescription(content);

        const clearContent = options?.clearContent ? { content: '' } : {};
        const clearComponents = options?.clearComponents
            ? { components: [] }
            : {};

        const additionalProps = {
            ...clearContent,
            ...clearComponents,
        };

        if (options?.oldMessage) {
            const oldMessage = options.oldMessage;

            return oldMessage.edit({ embeds: [embed], ...additionalProps });
        } else {
            return this.reply({ embeds: [embed], ...additionalProps });
        }
    }

    public async resolveUser(user: string) {
        const cachedUser = this.client.users.cache.get(user);
        if (cachedUser) return cachedUser;

        const cachedUserByName = this.client.users.cache.find((u) =>
            u.username.toLowerCase().includes(user.toLowerCase()),
        );
        if (cachedUserByName) return cachedUserByName;

        let id = user;

        const mention = user.match(/<@!?(\d+)>/);
        if (mention) id = mention[1];

        if (this.client.users.cache.has(id))
            return this.client.users.cache.get(id);
        else return await this.client.users.fetch(id);
    }

    public async resolveMember(member: string) {
        const cachedMember = this.message.guild?.members.cache.get(member);
        if (cachedMember) return cachedMember;

        const cachedMemberByName = this.message.guild?.members.cache.find((m) =>
            m.displayName.toLowerCase().includes(member.toLowerCase()),
        );
        if (cachedMemberByName) return cachedMemberByName;

        let id = member;

        const mention = member.match(/<@!?(\d+)>/);
        if (mention) id = mention[1];

        if (this.message.guild?.members.cache.has(id))
            return this.message.guild?.members.cache.get(id);
        else return await this.client.users.fetch(id);
    }

    public async resolveChannel(channel: string) {
        const cachedChannel = this.message.guild?.channels.cache.get(channel);
        if (cachedChannel) return cachedChannel;

        const cachedChannelByName = this.message.guild?.channels.cache.find(
            (c) => c.name.toLowerCase().includes(channel.toLowerCase()),
        );
        if (cachedChannelByName) return cachedChannelByName;

        let id = channel;

        const mention = channel.match(/<#(\d+)>/);
        if (mention) id = mention[1];

        if (this.message.guild?.channels.cache.has(id))
            return this.message.guild?.channels.cache.get(id);
        else return await this.client.channels.fetch(id);
    }

    public async resolveRole(role: string) {
        const cachedRole = this.message.guild?.roles.cache.get(role);
        if (cachedRole) return cachedRole;

        const cachedRoleByName = this.message.guild?.roles.cache.find((r) =>
            r.name.toLowerCase().includes(role.toLowerCase()),
        );
        if (cachedRoleByName) return cachedRoleByName;

        let id = role;

        const mention = role.match(/<@&(\d+)>/);
        if (mention) id = mention[1];

        if (this.message.guild?.roles.cache.has(id))
            return this.message.guild?.roles.cache.get(id);
        else return await this.message.guild?.roles.fetch(id);
    }

    public async resolveGuild(guild: string) {
        const cachedGuild = this.client.guilds.cache.get(guild);
        if (cachedGuild) return cachedGuild;

        const cachedGuildByName = this.client.guilds.cache.find((g) =>
            g.name.toLowerCase().includes(guild.toLowerCase()),
        );
        if (cachedGuildByName) return cachedGuildByName;

        let id = guild;

        const mention = guild.match(/<@!?(\d+)>/);
        if (mention) id = mention[1];

        if (this.client.guilds.cache.has(id))
            return this.client.guilds.cache.get(id);
        else return await this.client.guilds.fetch(id);
    }

    public async paginate(
        pages: string[] | EmbedBuilder[],
        startPage?: number,
        timeout = 300000,
    ): Promise<Message<boolean>> {
        const type = pages[0] instanceof EmbedBuilder ? 'embed' : 'text';

        let currentPage = startPage || 0;

        if (type == 'embed') {
            (pages as EmbedBuilder[]).forEach((page, index) => {
                page.setFooter({
                    text: `Page ${index + 1} of ${pages.length}`,
                });
            });
        }

        if (pages.length === 1) {
            if (type === 'text') return this.reply(pages[0] as string);
            else return this.reply({ embeds: [pages[0] as EmbedBuilder] });
        }

        const row: any = new ActionRowBuilder().setComponents(
            new ButtonBuilder()
                .setCustomId('previous')
                .setEmoji('<:left:1207660256256073728>')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('stop')
                .setEmoji('<:close:1207660254247129088>')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('next')
                .setEmoji('<:right:1207660252741374032>')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('jump')
                .setEmoji('<:sort:1207660871166468196>')
                .setStyle(ButtonStyle.Secondary),
        );

        const message =
            type === 'text'
                ? await this.reply({
                      content: pages[currentPage] as string,
                      components: [row],
                  })
                : await this.reply({
                      embeds: [pages[currentPage] as EmbedBuilder],
                      components: [row],
                  });

        const collector = message.createMessageComponentCollector({
            time: timeout,
        });

        collector.on('collect', async (interaction) => {
            if (interaction.user.id !== this.author.id)
                return await interaction.deferUpdate();
            if (interaction.customId !== 'jump')
                await interaction.deferUpdate();

            if (interaction.customId === 'previous') {
                if (currentPage === 0) return;
                currentPage--;
            } else if (interaction.customId === 'next') {
                if (currentPage === pages.length - 1) return;
                currentPage++;
            } else if (interaction.customId === 'jump') {
                const modal = new ModalBuilder()
                    .setCustomId('jump_modal')
                    .setTitle('Jump to Page');

                const pageInput = new TextInputBuilder()
                    .setCustomId('page_input')
                    .setPlaceholder(
                        `Enter a page number between 1 and ${pages.length}`,
                    )
                    .setLabel('Page Number')
                    .setRequired(true)
                    .setStyle(TextInputStyle.Short);

                const row: any = new ActionRowBuilder().addComponents(
                    pageInput,
                );
                modal.addComponents(row);

                await interaction.showModal(modal);

                const modalResponse = await interaction
                    .awaitModalSubmit({
                        time: 45000,
                    })
                    .catch(() => null);

                if (!modalResponse) return;

                const page = parseInt(
                    modalResponse.fields.getTextInputValue('page_input'),
                );

                if (isNaN(page) || page < 1 || page > pages.length) {
                    return interaction.reply({
                        content: 'Invalid page number, please try again',
                        ephemeral: true,
                    });
                }

                currentPage = page - 1;

                await modalResponse.deferUpdate();
            } else if (interaction.customId === 'stop') {
                collector.stop('exit_button');
                await message.delete();
                return this.message.react('👋');
            }

            if (type === 'text')
                await interaction.editReply(pages[currentPage] as string);
            else
                await interaction.editReply({
                    embeds: [pages[currentPage] as EmbedBuilder],
                });
        });

        collector.on('end', async (_, reason) => {
            if (reason === 'exit_button') return;

            row.components.forEach((btn: ButtonBuilder) =>
                btn.setDisabled(true),
            );

            if (type === 'text')
                await message.edit({
                    content: pages[currentPage] as string,
                    components: [row],
                });
            else
                await message.edit({
                    embeds: [pages[currentPage] as EmbedBuilder],
                    components: [row],
                });
        });

        return message;
    }

    public async confirm(): Promise<{
        confirmed: boolean;
        message: Message;
    }> {
        const row: any = new ActionRowBuilder().setComponents(
            new ButtonBuilder()
                .setCustomId('confirm')
                .setLabel('confirm')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('cancel')
                .setLabel('cancel')
                .setStyle(ButtonStyle.Danger),
        );

        const message = await this.reply({
            content: 'Are you sure you want to proceed?',
            components: [row],
        });

        return new Promise((resolve) => {
            const collector = message.createMessageComponentCollector({
                time: 40000,
            });

            collector.on('collect', async (interaction) => {
                if (interaction.user.id !== this.author.id)
                    return await interaction.deferUpdate();

                if (interaction.customId === 'confirm') {
                    resolve({
                        confirmed: true,
                        message,
                    });
                    collector.stop();
                } else if (interaction.customId === 'cancel') {
                    resolve({
                        confirmed: false,
                        message,
                    });
                    collector.stop();
                }

                await interaction.deferUpdate();
            });

            collector.on('end', async (_, reason) => {
                if (reason !== 'time') return;

                row.components.forEach((btn: ButtonBuilder) =>
                    btn.setDisabled(true),
                );

                await message.edit({ components: [row] });
            });
        });
    }
}
