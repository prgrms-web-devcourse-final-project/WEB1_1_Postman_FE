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
        <span className="relative flex size-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6868] opacity-75"></span>
            <span className="relative inline-flex size-4 rounded-full bg-[#FF6868] text-white text-[10px] flex-center leading-none">
                {renderCount}
            </span>
        </span>
    );
};
