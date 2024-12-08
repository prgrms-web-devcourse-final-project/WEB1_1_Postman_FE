import { NotificationItemItemProps } from '@/types/notification';
import { NotificationItem } from './NotificationItem';

type NotificationContainerProps = {
    notifications: Array<NotificationItemItemProps>;
};

export const NotificationContainer = ({
    notifications
}: NotificationContainerProps) => {
    return (
        <div>
            {notifications.map((notification, index) => {
                const { type, createdAt, letterId, isRead, label } =
                    notification;

                return (
                    <div key={index} className="mb-4">
                        <NotificationItem
                            type={type}
                            createdAt={createdAt}
                            letterId={letterId}
                            isRead={isRead}
                            label={label}
                        />
                    </div>
                );
            })}
        </div>
    );
};
