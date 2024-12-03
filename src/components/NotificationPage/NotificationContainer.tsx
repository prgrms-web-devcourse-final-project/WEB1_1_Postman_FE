import { NotificationProps } from '@/types/notification';
import { NotificationItem } from './NotificationItem';

type NotificationContainerProps = {
    notifications: Array<NotificationProps>;
};

export const NotificationContainer = ({
    notifications
}: NotificationContainerProps) => {
    return (
        <div>
            {notifications.map((notification, index) => {
                const { type, createdAt, letterId, isRead } = notification;

                return (
                    <div key={index} className="mb-4">
                        <NotificationItem
                            type={type}
                            createdAt={createdAt}
                            letterId={letterId}
                            isRead={isRead}
                        />
                    </div>
                );
            })}
        </div>
    );
};
