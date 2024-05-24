import BaseCommand, { CommandOptionType } from '../../structures/baseCommand';
import { MessageContext } from '../../structures/context';
import crypto from 'crypto';

export default class PollCommand extends BaseCommand {
    constructor() {
        super({
            name: 'crypto',
            aliases: ['crypt', 'cryptographic'],
            description: 'cryptographic tools',
            commands: [],
        });

        this.data.commands?.push({
            name: 'hash',
            description: 'hash a string\nsupported algorithms: md5, sha1, sha256, sha512, sha3-512',
            options: [
                {
                    name: 'algorithm',
                    description: 'algorithm to use',
                    type: CommandOptionType.String,
                    required: true,
                    choices: [
                        {
                            name: 'md5',
                            value: 'md5',
                        },
                        {
                            name: 'sha1',
                            value: 'sha1',
                        },
                        {
                            name: 'sha256',
                            value: 'sha256',
                        },
                        {
                            name: 'sha512',
                            value: 'sha512',
                        },
                        {
                            name: 'sha3-512',
                            value: 'sha3-512',
                        },
                    ],
                },
                {
                    name: 'string',
                    description: 'the string to hash',
                    type: CommandOptionType.String,
                    required: true,
                },
            ],
            run: this.hash.bind(this),
        });

        this.data.commands?.push({
            name: 'bytes',
            description: 'generate random bytes',
            options: [
                {
                    name: 'length',
                    description: 'the length of the bytes',
                    type: CommandOptionType.Integer,
                    required: true,
                },
            ],
            run: this.bytes.bind(this),
        });
    }

    public async run(ctx: MessageContext) {
        ctx.message.content = `${ctx.prefixes[0]}help crypto`;
        ctx.client.emit('messageCreate', ctx.message);
    }

    public async hash(ctx: MessageContext) {
        const string = ctx.options?.string as string;
        const algorithm = ctx.options?.algorithm as string;

        const hash = crypto.createHash(algorithm).update(string).digest('hex');

        return ctx.say(`\`\`\`ansi\n[1;2m[1;33mHash:[0m[1;33m[0m[0m\n${hash}\`\`\``);
    }

    public async bytes(ctx: MessageContext) {
        const length = ctx.options?.length as number;

        if (length > 500) {
            return ctx.say('length must be less than 500');
        }

        const bytes = crypto.randomBytes(length);

        return ctx.say(`\`\`\`ansi\n[1;2m[1;33mBytes:[0m[1;33m[0m[0m\n${bytes.toString('hex')}\`\`\``);
    }
}
