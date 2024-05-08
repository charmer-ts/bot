import {
    ApplicationCommandPermissionsUpdateData,
    AutoModerationActionExecution,
    AutoModerationRule,
    BaseInteraction,
    Collection,
    DMChannel,
    Entitlement,
    ForumChannel,
    Guild,
    GuildAuditLogsEntry,
    GuildBan,
    GuildChannel,
    GuildEmoji,
    GuildMember,
    GuildScheduledEvent,
    Invite,
    MediaChannel,
    Message,
    MessageReaction,
    NewsChannel,
    PollAnswer,
    Presence,
    Role,
    Snowflake,
    StageChannel,
    StageInstance,
    Sticker,
    TextChannel,
    ThreadChannel,
    ThreadMember,
    Typing,
    User,
    VoiceChannel,
    VoiceState,
} from 'discord.js';
import { client } from '../main';

export default class BaseEvent {
    public client = client;

    public constructor() {
        for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
            if (key.startsWith('on_')) {
                const event = key.slice(3);
                client.on(event, this[key].bind(this));
            } else if (key.startsWith('once_')) {
                const event = key.slice(5);
                client.once(event, this[key].bind(this));
            }
        }
    }

    /**
     * When i was writing that shit it was late night
     * DONT JUDGE!
     * but if you want you can submit a pr that will fix this nightmare
     * for now its gonna be like that
     */

    on_applicationCommandPermissionsUpdate(
        data: ApplicationCommandPermissionsUpdateData,
    ): any | Promise<any> {}
    once_applicationCommandPermissionsUpdate(
        data: ApplicationCommandPermissionsUpdateData,
    ): any | Promise<any> {}
    on_autoModerationActionExecution(
        autoModerationActionExecution: AutoModerationActionExecution,
    ): any | Promise<any> {}
    once_autoModerationActionExecution(
        autoModerationActionExecution: AutoModerationActionExecution,
    ): any | Promise<any> {}
    on_autoModerationRuleCreate(autoModerationRule: AutoModerationRule): any | Promise<any> {}
    once_autoModerationRuleCreate(autoModerationRule: AutoModerationRule): any | Promise<any> {}
    on_autoModerationRuleDelete(autoModerationRule: AutoModerationRule): any | Promise<any> {}
    once_autoModerationRuleDelete(autoModerationRule: AutoModerationRule): any | Promise<any> {}
    on_autoModerationRuleUpdate(
        oldAutoModerationRule: AutoModerationRule,
        newAutoModerationRule: AutoModerationRule,
    ): any | Promise<any> {}
    once_autoModerationRuleUpdate(
        oldAutoModerationRule: AutoModerationRule,
        newAutoModerationRule: AutoModerationRule,
    ): any | Promise<any> {}
    on_channelCreate(channel: GuildChannel): any | Promise<any> {}
    once_channelCreate(channel: GuildChannel): any | Promise<any> {}
    on_channelDelete(channel: DMChannel | GuildChannel): any | Promise<any> {}
    once_channelDelete(channel: DMChannel | GuildChannel): any | Promise<any> {}
    on_channelPinsUpdate(channel: TextChannel, time: Date): any | Promise<any> {}
    once_channelPinsUpdate(channel: TextChannel, time: Date): any | Promise<any> {}
    on_channelUpdate(
        oldChannel: DMChannel | GuildChannel,
        newChannel: DMChannel | GuildChannel,
    ): any | Promise<any> {}
    once_channelUpdate(
        oldChannel: DMChannel | GuildChannel,
        newChannel: DMChannel | GuildChannel,
    ): any | Promise<any> {}
    on_debug(info: string): any | Promise<any> {}
    once_debug(info: string): any | Promise<any> {}
    on_emojiCreate(emoji: GuildEmoji): any | Promise<any> {}
    once_emojiCreate(emoji: GuildEmoji): any | Promise<any> {}
    on_emojiDelete(emoji: GuildEmoji): any | Promise<any> {}
    once_emojiDelete(emoji: GuildEmoji): any | Promise<any> {}
    on_emojiUpdate(oldEmoji: GuildEmoji, newEmoji: GuildEmoji): any | Promise<any> {}
    once_emojiUpdate(oldEmoji: GuildEmoji, newEmoji: GuildEmoji): any | Promise<any> {}
    on_entitlementCreate(entitlement: Entitlement): any | Promise<any> {}
    once_entitlementCreate(entitlement: Entitlement): any | Promise<any> {}
    on_entitlementDelete(entitlement: Entitlement): any | Promise<any> {}
    once_entitlementDelete(entitlement: Entitlement): any | Promise<any> {}
    on_entitlementUpdate(
        oldEntitlement: Entitlement,
        newEntitlement: Entitlement,
    ): any | Promise<any> {}
    on_error(error: Error): any | Promise<any> {}
    once_error(error: Error): any | Promise<any> {}
    on_guildAuditLogEntryCreate(
        auditLogEntry: GuildAuditLogsEntry,
        guild: Guild,
    ): any | Promise<any> {}
    once_guildAuditLogEntryCreate(
        auditLogEntry: GuildAuditLogsEntry,
        guild: Guild,
    ): any | Promise<any> {}
    on_guildAvailable(guild: Guild): any | Promise<any> {}
    once_guildAvailable(guild: Guild): any | Promise<any> {}
    on_guildBanAdd(guildBan: GuildBan): any | Promise<any> {}
    once_guildBanAdd(guildBan: GuildBan): any | Promise<any> {}
    on_guildBanRemove(guildBan: GuildBan): any | Promise<any> {}
    once_guildBanRemove(guildBan: GuildBan): any | Promise<any> {}
    on_guildCreate(guild: Guild): any | Promise<any> {}
    once_guildCreate(guild: Guild): any | Promise<any> {}
    on_guildDelete(guild: Guild): any | Promise<any> {}
    once_guildDelete(guild: Guild): any | Promise<any> {}
    on_guildInteractionsUpdate(guild: Guild): any | Promise<any> {}
    once_guildInteractionsUpdate(guild: Guild): any | Promise<any> {}
    on_guildMemberAdd(member: GuildMember): any | Promise<any> {}
    once_guildMemberAdd(member: GuildMember): any | Promise<any> {}
    on_guildMemberAvailable(member: GuildMember): any | Promise<any> {}
    once_guildMemberAvailable(member: GuildMember): any | Promise<any> {}
    on_guildMemberRemove(member: GuildMember): any | Promise<any> {}
    once_guildMemberRemove(member: GuildMember): any | Promise<any> {}
    on_guildMemberUpdate(oldMember: GuildMember, newMember: GuildMember): any | Promise<any> {}
    once_guildMemberUpdate(oldMember: GuildMember, newMember: GuildMember): any | Promise<any> {}
    on_guildSchduledEventCreate(guildScheduledEvent: GuildScheduledEvent): any | Promise<any> {}
    once_guildSchduledEventCreate(guildScheduledEvent: GuildScheduledEvent): any | Promise<any> {}
    on_guildSchduledEventDelete(guildScheduledEvent: GuildScheduledEvent): any | Promise<any> {}
    once_guildSchduledEventDelete(guildScheduledEvent: GuildScheduledEvent): any | Promise<any> {}
    on_guildSchduledEventUpdate(
        oldGuildScheduledEvent: GuildScheduledEvent,
        newGuildScheduledEvent: GuildScheduledEvent,
    ): any | Promise<any> {}
    once_guildSchduledEventUpdate(
        oldGuildScheduledEvent: GuildScheduledEvent,
        newGuildScheduledEvent: GuildScheduledEvent,
    ): any | Promise<any> {}
    on_guildScheduledEventUserAdd(
        guildScheduledEvent: GuildScheduledEvent,
        user: User,
    ): any | Promise<any> {}
    once_guildScheduledEventUserAdd(
        guildScheduledEvent: GuildScheduledEvent,
        user: User,
    ): any | Promise<any> {}
    on_guildScheduledEventUserRemove(
        guildScheduledEvent: GuildScheduledEvent,
        user: User,
    ): any | Promise<any> {}
    once_guildScheduledEventUserRemove(
        guildScheduledEvent: GuildScheduledEvent,
        user: User,
    ): any | Promise<any> {}
    on_guildUnavailable(guild: Guild): any | Promise<any> {}
    once_guildUnavailable(guild: Guild): any | Promise<any> {}
    on_guildUpdate(oldGuild: Guild, newGuild: Guild): any | Promise<any> {}
    once_guildUpdate(oldGuild: Guild, newGuild: Guild): any | Promise<any> {}
    on_interactionCreate(interaction: BaseInteraction): any | Promise<any> {}
    once_interactionCreate(interaction: BaseInteraction): any | Promise<any> {}
    on_inviteCreate(invite: Invite): any | Promise<any> {}
    once_inviteCreate(invite: Invite): any | Promise<any> {}
    on_inviteDelete(invite: Invite): any | Promise<any> {}
    once_inviteDelete(invite: Invite): any | Promise<any> {}
    on_messageCreate(message: Message): any | Promise<any> {}
    once_messageCreate(message: Message): any | Promise<any> {}
    on_messageDelete(message: Message): any | Promise<any> {}
    once_messageDelete(message: Message): any | Promise<any> {}
    on_messageDeleteBulk(messages: Collection<Snowflake, Message>): any | Promise<any> {}
    once_messageDeleteBulk(messages: Collection<Snowflake, Message>): any | Promise<any> {}
    on_messagePollVoteAdd(pollAnswer: PollAnswer, userId: Snowflake): any | Promise<any> {}
    once_messagePollVoteAdd(pollAnswer: PollAnswer, userId: Snowflake): any | Promise<any> {}
    on_messagePollVoteRemove(pollAnswer: PollAnswer, userId: Snowflake): any | Promise<any> {}
    once_messagePollVoteRemove(pollAnswer: PollAnswer, userId: Snowflake): any | Promise<any> {}
    on_messageReactionAdd(messageReaction: MessageReaction, user: User): any | Promise<any> {}
    once_messageReactionAdd(messageReaction: MessageReaction, user: User): any | Promise<any> {}
    on_messageReactionRemove(messageReaction: MessageReaction, user: User): any | Promise<any> {}
    once_messageReactionRemove(messageReaction: MessageReaction, user: User): any | Promise<any> {}
    on_messageReactionRemoveAll(
        message: Message,
        reactions: Collection<string, MessageReaction>,
    ): any | Promise<any> {}
    once_messageReactionRemoveAll(
        message: Message,
        reactions: Collection<string, MessageReaction>,
    ): any | Promise<any> {}
    on_messageReactionRemoveEmoji(messageReaction: MessageReaction): any | Promise<any> {}
    once_messageReactionRemoveEmoji(messageReaction: MessageReaction): any | Promise<any> {}
    on_messageUpdate(oldMessage: Message, newMessage: Message): any | Promise<any> {}
    once_messageUpdate(oldMessage: Message, newMessage: Message): any | Promise<any> {}
    on_presenceUpdate(oldPresence: Presence | null, newPresence: Presence): any | Promise<any> {}
    once_presenceUpdate(oldPresence: Presence | null, newPresence: Presence): any | Promise<any> {}
    on_ready(): any | Promise<any> {}
    once_ready(): any | Promise<any> {}
    on_roleCreate(role: Role): any | Promise<any> {}
    once_roleCreate(role: Role): any | Promise<any> {}
    on_roleDelete(role: Role): any | Promise<any> {}
    once_roleDelete(role: Role): any | Promise<any> {}
    on_roleUpdate(oldRole: Role, newRole: Role): any | Promise<any> {}
    once_roleUpdate(oldRole: Role, newRole: Role): any | Promise<any> {}
    on_stageInstanceCreate(stageInstance: StageInstance): any | Promise<any> {}
    once_stageInstanceCreate(stageInstance: StageInstance): any | Promise<any> {}
    on_stageInstanceDelete(stageInstance: StageInstance): any | Promise<any> {}
    once_stageInstanceDelete(stageInstance: StageInstance): any | Promise<any> {}
    on_stageInstanceUpdate(
        oldStageInstance: StageInstance,
        newStageInstance: StageInstance,
    ): any | Promise<any> {}
    once_stageInstanceUpdate(
        oldStageInstance: StageInstance,
        newStageInstance: StageInstance,
    ): any | Promise<any> {}
    on_stickerCreate(sticker: Sticker): any | Promise<any> {}
    once_stickerCreate(sticker: Sticker): any | Promise<any> {}
    on_stickerDelete(sticker: Sticker): any | Promise<any> {}
    once_stickerDelete(sticker: Sticker): any | Promise<any> {}
    on_stickerUpdate(oldSticker: Sticker, newSticker: Sticker): any | Promise<any> {}
    once_stickerUpdate(oldSticker: Sticker, newSticker: Sticker): any | Promise<any> {}
    on_threadCreate(thread: ThreadChannel): any | Promise<any> {}
    once_threadCreate(thread: ThreadChannel): any | Promise<any> {}
    on_threadDelete(thread: ThreadChannel): any | Promise<any> {}
    once_threadDelete(thread: ThreadChannel): any | Promise<any> {}
    on_threadListSync(
        threads: Collection<Snowflake, ThreadChannel>,
        guild: Guild,
    ): any | Promise<any> {}
    once_threadListSync(
        threads: Collection<Snowflake, ThreadChannel>,
        guild: Guild,
    ): any | Promise<any> {}
    on_threadMembersUpdate(
        addedMembers: Collection<Snowflake, ThreadMember>,
        removedMembers: Collection<Snowflake, ThreadMember>,
        thread: ThreadChannel,
    ): any | Promise<any> {}
    once_threadMembersUpdate(
        addedMembers: Collection<Snowflake, ThreadMember>,
        removedMembers: Collection<Snowflake, ThreadMember>,
        thread: ThreadChannel,
    ): any | Promise<any> {}
    on_threadMemberUpdate(oldMember: ThreadMember, newMember: ThreadMember): any | Promise<any> {}
    once_threadMemberUpdate(oldMember: ThreadMember, newMember: ThreadMember): any | Promise<any> {}
    on_threadUpdate(oldThread: ThreadChannel, newThread: ThreadChannel): any | Promise<any> {}
    once_threadUpdate(oldThread: ThreadChannel, newThread: ThreadChannel): any | Promise<any> {}
    on_typingStart(typing: Typing): any | Promise<any> {}
    once_typingStart(typing: Typing): any | Promise<any> {}
    on_userUpdate(oldUser: User, newUser: User): any | Promise<any> {}
    once_userUpdate(oldUser: User, newUser: User): any | Promise<any> {}
    on_voiceStateUpdate(oldState: VoiceState, newState: VoiceState): any | Promise<any> {}
    once_voiceStateUpdate(oldState: VoiceState, newState: VoiceState): any | Promise<any> {}
    on_webhooksUpdate(
        channel:
            | TextChannel
            | NewsChannel
            | VoiceChannel
            | StageChannel
            | ForumChannel
            | MediaChannel,
    ): any | Promise<any> {}
    once_webhooksUpdate(
        channel:
            | TextChannel
            | NewsChannel
            | VoiceChannel
            | StageChannel
            | ForumChannel
            | MediaChannel,
    ): any | Promise<any> {}
    on_warn(info: string): any | Promise<any> {}
    once_warn(info: string): any | Promise<any> {}
}
