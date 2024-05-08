import { PermissionResolvable } from 'discord.js';
import { client } from '../main';
import { MessageContext } from './context';

type commandData = {
    name: string;
    description?: string;
    aliases?: string[];

    permissions?: PermissionResolvable[];
    botPermissions?: PermissionResolvable[];

    category?: string;
};

export default class BaseCommand {
    public data: commandData;

    public constructor(data: commandData) {
        this.data = data;
    }

    public client = client;

    public async run(ctx: MessageContext): Promise<void> {
        ctx.message.reply('This command does not have a run method');
    }
}
