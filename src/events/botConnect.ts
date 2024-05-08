import BaseEvent from '../structures/baseEvent';

export default class BotConnectEvents extends BaseEvent {
    on_ready() {
        console.log(`Logged in as ${this.client.user?.tag}`);
    }
}
