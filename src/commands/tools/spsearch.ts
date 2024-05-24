import { searchSpotifyTrack } from '../../services/spotify';
import BaseCommand, { CommandOptionType } from '../../structures/baseCommand';
import { MessageContext } from '../../structures/context';

export default class SpsearchCommand extends BaseCommand {
    constructor() {
        super({
            name: 'spsearch',
            description: 'search spotify for a song',
            aliases: ['spotify', 'sp'],
            options: [
                {
                    name: 'query',
                    description: 'the song to search for',
                    type: CommandOptionType.String,
                    required: true,
                },
            ],
        });
    }

    public async run(ctx: MessageContext) {
        const query = ctx.options?.query as string;

        const result = await searchSpotifyTrack(query);
        const track = result.tracks.items[0];

        if (!track) {
            return ctx.say('No results found');
        }

        return ctx.reply(`[⠀](${track.external_urls.spotify})`);
    }
}
