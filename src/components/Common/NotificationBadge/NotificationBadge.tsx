import { MAX_NOTIFICATION_COUNT } from '@/constants/maxNotificationCount';
import React from 'react';

type NotificationBadgeProps = {
    count: number;
};

export const NotificationBadge = ({ count }: NotificationBadgeProps) => {
    if (count <= 0) return null; // count가 0개 이하일 경우 렌더링하지 않습니다.

    const renderCount =
        count > MAX_NOTIFICATION_COUNT ? `${MAX_NOTIFICATION_COUNT}+` : count;

    return (
        <div className="absolute bg-[#FF6868] rounded-full text-white text-body1 flex-center h-6 px-3 leading-none">
            {renderCount}
        </div>
    );
};
