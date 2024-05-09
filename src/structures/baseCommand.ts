import { PermissionResolvable } from 'discord.js';
import { client } from '../main';
import { MessageContext } from './context';

export enum CommandOptionType {
    String = 1,
    Integer = 2,
    Boolean = 3,
    User = 6,
    Member = 7,
    Channel = 8,
    Role = 9,
    Server = 10,
}

export interface CommandOption {
    name: string;
    description: string;
    type: CommandOptionType;
    required?: boolean;
    choices?: { name: string; value: string }[];
}

export interface CommandSchema {
    name: string;
    description?: string;
    aliases?: string[];

    permissions?: PermissionResolvable[];
    botPermissions?: PermissionResolvable[];

    commands?: CommandSchema[];
    options?: CommandOption[];

    run?: (ctx: MessageContext) => Promise<any> | any;
    check?: (ctx: MessageContext) => Promise<boolean> | boolean;

    category?: string;
}

export default class BaseCommand {
    public data: CommandSchema;

    public constructor(data: CommandSchema) {
        this.data = data;
    }

    public client = client;

    public async run(ctx: MessageContext): Promise<any> {
        ctx.message.reply('This command does not have a run method');
    }
}
