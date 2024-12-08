export type NotificationType =
    | 'NEW_LETTER'
    | 'TARGET_LETTER'
    | 'KEYWORD_REPLY'
    | 'MAP_REPLY'
    | 'WARNING'
    | 'BAN';

export type NotificationItemItemProps = {
    type: NotificationType;
    createdAt: string;
    letterId: number;
    isRead: boolean;
    label: string;
};

export type NotificationResponseType = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        id: string;
        type: NotificationType;
        receiver: number;
        createdAt: string;
        letterId: number;
        isRead: boolean;
        label: string;
    }[];
};
