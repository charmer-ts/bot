import { ActivityType, ClientOptions, Colors, GatewayIntentBits, Partials } from 'discord.js';
import BaseConfiguration from '../../structures/baseConfiguration';

export default class BotConfiguration extends BaseConfiguration {
    public static token: string = process.env.TOKEN!;

    public static clientOptions: ClientOptions = {
        intents: Object.values(GatewayIntentBits).map((bit) => bit) as GatewayIntentBits[],
        partials: Object.values(Partials).map((bit) => bit) as Partials[],
        allowedMentions: {
            repliedUser: false,
        },
        presence: {
            status: 'online',
            activities: [
                {
                    name: 'charmer.js',
                    type: ActivityType.Custom,
                },
            ],
        },
    };

    public static colors = {
        transparent: 0x2b2d31,
        red: 0xff3333,
        green: 0x33ff3d,
        gray: 0x7d7d7d,
        blurple: Colors.Blurple,
    };

    public static emojis = {
        paginationPrevious: process.env.EMOTE_PREVIOUS || '<:left:1207660256256073728>',
        paginationClose: process.env.EMOTE_CLOSE || '<:close:1207660254247129088>',
        paginationNext: process.env.EMOTE_NEXT || '<:right:1207660252741374032>',
        paginationJump: process.env.EMOTE_JUMP || '<:sort:1207660871166468196>',
    };
}
