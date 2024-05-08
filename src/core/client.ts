import { Client, Collection } from 'discord.js';
import BotConfiguration from './data/bot.configuration';
import EnvironmentConfiguration from './data/environment.configuration';
import FeatureLoader from '../structures/featureLoader';
import { PrismaClient } from '@prisma/client';

export const database = new PrismaClient();

export default class CoreClient extends Client<boolean> {
    public commands = new Collection<string, any>();

    public database = database;
    public config = BotConfiguration;
    public env = EnvironmentConfiguration;

    public prefixCache = new Collection<string, string[]>();

    constructor() {
        super(BotConfiguration.clientOptions);
    }

    public start() {
        new FeatureLoader();
        this.login(this.config.token);
    }
}
