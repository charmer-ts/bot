import { EmbedBuilder } from 'discord.js';
import BaseCommand, { CommandOptionType } from '../../structures/baseCommand';
import { MessageContext } from '../../structures/context';
import { addGuildPrefix, setGuildPrefixes } from '../../database/guild';

export default class PrefixCommands extends BaseCommand {
    constructor() {
        super({
            name: 'prefix',
            description: 'change the prefix of the bot',
            category: 'config',
            aliases: ['setprefix'],
            permissions: ['ManageGuild'],
            commands: [],
        });

        this.data.commands?.push({
            name: 'add',
            aliases: ['create', 'new'],
            description: 'add a new prefix',
            options: [
                {
                    name: 'prefix',
                    description: 'the prefix to add',
                    type: CommandOptionType.String,
                    required: true,
                },
            ],
            run: this.addPrefix.bind(this),
        });

        this.data.commands?.push({
            name: 'remove',
            aliases: ['delete', 'del', 'rm', 'rem'],
            description: 'remove a prefix',
            options: [
                {
                    name: 'prefix',
                    description: 'the prefix to remove',
                    type: CommandOptionType.String,
                    required: true,
                },
            ],
            run: this.removePrefix.bind(this),
        });

        this.data.commands?.push({
            name: 'set',
            aliases: ['overwrite'],
            description: 'overwrite all prefixes and set a new one',
            options: [
                {
                    name: 'prefix',
                    description: 'the new prefix',
                    type: CommandOptionType.String,
                    required: true,
                },
            ],
            run: this.setPrefix.bind(this),
        });

        this.data.commands?.push({
            name: 'validate',
            aliases: ['check', 'verify', 'test'],
            description: 'check if a prefix is valid',
            options: [
                {
                    name: 'prefix',
                    description: 'the prefix to validate',
                    type: CommandOptionType.String,
                    required: true,
                },
            ],
            run: this.testPrefix.bind(this),
        });

        this.data.commands?.push({
            name: 'reset',
            aliases: ['clear'],
            description: 'reset all prefixes',
            run: this.resetPrefixes.bind(this),
        });
    }

    public async run(ctx: MessageContext): Promise<any> {
        const embed = new EmbedBuilder()
            .setColor(ctx.client.config.colors.transparent)
            .setAuthor({
                name: ctx.author.username,
                iconURL: ctx.author.avatarURL()!,
            })
            .setTitle('Prefix Configuration')
            .setDescription(
                'You can modify prefixes using **prefix add** or **remove**',
            )
            .addFields([
                {
                    name: 'Current Prefixes',
                    value: ctx.prefixes
                        .map((prefix) => `- ${prefix}`)
                        .join('\n'),
                },
            ]);

        return ctx.reply({ embeds: [embed] });
    }

    public async isPrefixValid(
        prefix: string,
        skipSpacesCheck = false,
    ): Promise<boolean> {
        /**
         * Runs the following checks on the prefix:
         * - The prefix must be between 1 and 7 characters long.
         * - The prefix should not contain any spaces.
         */

        if (prefix.length < 1 || prefix.length > 7) return false;
        if (prefix.includes(' ') && !skipSpacesCheck) return false;

        return true;
    }

    public async addPrefix(ctx: MessageContext): Promise<any> {
        const prefix = ctx.options.prefix;

        if (ctx.prefixes.includes(prefix))
            return ctx.say('This prefix is already added');

        if (ctx.prefixes.length >= 5)
            return ctx.say('You can only have up to 5 prefixes');

        if (
            !(await this.isPrefixValid(
                prefix,
                ctx.flags.includes('skipSpaces'),
            ))
        )
            return ctx.say(
                'This prefix is invalid,\n- Must be between 1 and 7 characters long\n- Must not contain any spaces (--skipSpaces to ignore)',
            );

        const updatedPrefixes = await addGuildPrefix(
            ctx.message.guildId!,
            prefix,
        );

        if (!updatedPrefixes)
            return ctx.say(
                'An error occurred while adding the prefix, if this error persists, please contact the bot owner',
            );

        await ctx.say(`The prefix '${prefix}' has been added`);
    }

    public async removePrefix(ctx: MessageContext): Promise<any> {
        const prefix = ctx.options.prefix;

        if (!ctx.prefixes.includes(prefix))
            return ctx.say('This prefix is not added');

        const updatedPrefixes = await setGuildPrefixes(
            ctx.message.guildId!,
            ctx.prefixes.filter((p) => p !== prefix),
        );

        if (!updatedPrefixes)
            return ctx.say(
                'An error occurred while removing the prefix, if this error persists, please contact the bot owner',
            );

        await ctx.say(`The prefix '${prefix}' has been removed`);
    }

    public async resetPrefixes(ctx: MessageContext): Promise<any> {
        const { confirmed, message } = await ctx.confirm();

        if (confirmed == false) {
            return await message.edit({
                content: 'Prefix reset has been cancelled',
                components: [],
            });
        }

        const updatedPrefixes = await setGuildPrefixes(ctx.message.guildId!, [
            '!',
            '?',
        ]);

        if (!updatedPrefixes)
            return ctx.say(
                'An error occurred while resetting the prefixes, if this error persists, please contact the bot owner',
                {
                    oldMessage: message,
                    clearContent: true,
                    clearComponents: true,
                },
            );

        await ctx.say('All prefixes have been reset', {
            oldMessage: message,
            clearContent: true,
            clearComponents: true,
        });
    }

    public async setPrefix(ctx: MessageContext): Promise<any> {
        const { confirmed, message } = await ctx.confirm();

        if (confirmed == false) {
            return await message.edit({
                content: 'Prefix set has been cancelled',
                components: [],
            });
        }

        const prefix = ctx.options.prefix;

        if (
            !(await this.isPrefixValid(
                prefix,
                ctx.flags.includes('skipSpaces'),
            ))
        )
            return ctx.say(
                'This prefix is invalid,\n- Must be between 1 and 7 characters long\n- Must not contain any spaces (--skipSpaces to ignore)',
            );

        const updatedPrefixes = await setGuildPrefixes(ctx.message.guildId!, [
            prefix,
        ]);

        if (!updatedPrefixes)
            return ctx.say(
                'An error occurred while setting the prefix, if this error persists, please contact the bot owner',
            );

        await ctx.say(`The prefix has been set to '${prefix}'`);
    }

    public async testPrefix(ctx: MessageContext): Promise<any> {
        const prefix = ctx.options.prefix;

        if (
            !(await this.isPrefixValid(
                prefix,
                ctx.flags.includes('skipSpaces'),
            ))
        )
            return ctx.say(
                `The prefix '${prefix}' is invalid,\n- Must be between 1 and 7 characters long\n- Must not contain any spaces (--skipSpaces to ignore)`,
            );

        await ctx.say(`The prefix '${prefix}' is valid`);
    }
}
