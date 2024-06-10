import { GuildMember, Role } from 'discord.js';
import BaseCommand, { CommandOptionType } from '../../structures/baseCommand';
import { MessageContext } from '../../structures/context';

export default class RoleCommand extends BaseCommand {
    constructor() {
        super({
            name: 'role',
            description: 'toggle role of a member',
            options: [
                {
                    name: 'member',
                    description: 'the member to toggle role',
                    type: CommandOptionType.Member,
                    required: true,
                },
                {
                    name: 'role',
                    description: 'the role to toggle',
                    type: CommandOptionType.Role,
                    required: true,
                },
            ],
        });
    }

    public async handleChange(func: Function, ctx: MessageContext) {
        try {
            await func();
        } catch (error) {
            return ctx.say('An error occured while toggling role!');
        }
    }

    public async run(ctx: MessageContext) {
        const member = ctx.options?.member as GuildMember;
        const role = ctx.options?.role as Role;

        if (!ctx.message.guild?.members?.me?.permissions.has('ManageRoles')) {
            return ctx.say('I do not have permission to manage roles!');
        }

        if (!role.editable) {
            return ctx.say('I cannot manage this role!');
        }

        if (member.roles.cache.has(role.id)) {
            await this.handleChange(() => member.roles.remove(role), ctx);
            return ctx.say(
                `Role <@&${role.id}> removed from ${member.user.username}`,
            );
        }

        await this.handleChange(() => member.roles.add(role), ctx);
        return ctx.say(`Role <@&${role.id}> added to ${member.user.username}`);
    }
}
