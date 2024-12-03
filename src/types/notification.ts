export type NotificationType =
    | 'NEW_LETTER'
    | 'TARGET_LETTER'
    | 'REPLY_LETTER'
    | 'WARNING'
    | 'BAN';

export type NotificationProps = {
    type: NotificationType;
    createdAt: string;
    letterId: number;
    isRead: boolean;
};
