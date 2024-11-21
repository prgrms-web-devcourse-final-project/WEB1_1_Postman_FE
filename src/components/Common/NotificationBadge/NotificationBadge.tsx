import React from 'react';

interface NotificationBadgeProps {
    count: number;
}

export const NotificationBadge = ({ count }: NotificationBadgeProps) => {
    const NotificationBadgeStyle =
        ' bg-red-600 px-2 py-1 rounded-full text-white font-semibold';

    const NotificationBadgeContent = (count: number) => {
        if (count > 99) {
            return (
                <>
                    <span style={{ position: 'relative', top: '-1px' }}>+</span>
                    99
                </>
            );
        }
        return (
            <>
                {count}
                <span style={{ position: 'relative', top: '-1px' }}>+</span>
            </>
        );
    };

    return (
        <div
            className={`${NotificationBadgeStyle} inline-flex items-center justify-center text-center align-text-middle`}
        >
            {NotificationBadgeContent(count)}
        </div>
    );
};
