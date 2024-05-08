import fs from 'fs';
import path from 'path';
import { client } from '../main';

export default class FeatureLoader {
    constructor() {
        this.loadEvents();
        this.loadCommands();
    }

    private findEventFiles() {
        const eventFiles = [];
        const files = fs.readdirSync(path.join(__dirname, '../events'));

        for (const file of files) {
            if (fs.statSync(path.join(__dirname, `../events/${file}`)).isDirectory()) {
                const nestedFiles = fs.readdirSync(path.join(__dirname, `../events/${file}`));
                for (const nestedFile of nestedFiles) {
                    eventFiles.push(`${file}/${nestedFile}` as never);
                }
            } else {
                eventFiles.push(file as never);
            }
        }

        return eventFiles;
    }

    private async loadEvents() {
        const eventFiles = this.findEventFiles();

        for (const file of eventFiles) {
            const event = await import(`../events/${file}`);
            new event.default();
        }
    }

    private findCommandFiles() {
        const commandFiles = [];
        const categories = fs.readdirSync(path.join(__dirname, '../commands'));

        for (const category of categories) {
            const files = fs.readdirSync(path.join(__dirname, `../commands/${category}`));
            for (const file of files) {
                commandFiles.push(`${category}/${file}` as never);
            }
        }

        return commandFiles;
    }

    private async loadCommands() {
        const commandFiles = this.findCommandFiles();

        for (const file of commandFiles) {
            const command = await import(`../commands/${file}`);
            const commandInstance = new command.default();
            const commandCategory = (file as string).split('/')[0];

            const commandData = {
                ...commandInstance.data,
                category: commandCategory,
            };

            commandInstance.data = commandData;

            client.commands.set(commandInstance.data.name, commandInstance);
        }
    }
}
