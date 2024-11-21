import React from 'react';

interface NotificationBadgeProps {
    badgeType: 'notification' | 'dday';
    count: number;
}

export const NotificationBadge = ({
    badgeType,
    count
}: NotificationBadgeProps) => {
    const NotificationBadgeStyle =
        'bg-red-600 px-2 py-1 rounded-full text-white font-semibold';

    const NotificationBadgeContent = (type, count: number) => {
        switch (type) {
            case 'notification':
                if (count > 99) {
                    return (
                        <>
                            <span style={{ position: 'relative', top: '-1px' }}>
                                +
                            </span>
                            99
                        </>
                    );
                }
                return (
                    <>
                        {count}
                        <span style={{ position: 'relative', top: '-1px' }}>
                            +
                        </span>
                    </>
                );
            case 'dday':
                return (
                    <>
                        D
                        <span style={{ position: 'relative', top: '-1px' }}>
                            -
                        </span>
                        {count}
                    </>
                );
            default:
                break;
        }
    };

    return (
        <div
            className={`${NotificationBadgeStyle} inline-flex items-center justify-center text-center align-text-middle`}
        >
            {NotificationBadgeContent(badgeType, count)}
        </div>
    );
};
