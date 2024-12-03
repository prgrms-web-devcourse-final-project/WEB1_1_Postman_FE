import { NotificationProps } from '@/types/notification';

export const NotificationItem = ({
    type,
    createdAt,
    letterId,
    isRead
}: NotificationProps) => {
    return (
        <div>
            <div>{type}</div>
            <div>{createdAt}</div>
            <div>{letterId}</div>
            <div>{isRead.toString()}</div>
        </div>
    );
};
