import React from 'react';

interface NotificationBadgeProps {
<<<<<<< HEAD
    badgeType: 'basic' | 'dday';
=======
    badgeType: 'notification' | 'dday';
>>>>>>> main
    count: number;
}

export const NotificationBadge = ({
    badgeType,
    count
}: NotificationBadgeProps) => {
<<<<<<< HEAD
    const MAX_COUNT = 99;
    const BaseStyle =
        'inline-flex items-center justify-center text-center align-text-middle';
    const styleMap = {
        basic: 'bg-red-600 px-2 py-1 rounded-full text-white font-semibold',
        dday: 'bg-yellow-400 px-2 py-1 rounded-sm text-white font-semibold'
    };

    const renderContent = (badgeType: 'basic' | 'dday', count: number) => {
        switch (badgeType) {
            case 'basic':
                if (count > MAX_COUNT) {
=======
    const NotificationBadgeStyle =
        'bg-red-600 px-2 py-1 rounded-full text-white font-semibold';

    const NotificationBadgeContent = (type, count: number) => {
        switch (type) {
            case 'notification':
                if (count > 99) {
>>>>>>> main
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
<<<<<<< HEAD
                return null;
=======
                break;
>>>>>>> main
        }
    };

    return (
<<<<<<< HEAD
        <div className={`${BaseStyle} ${styleMap[badgeType]}`}>
            {renderContent(badgeType, count)}
=======
        <div
            className={`${NotificationBadgeStyle} inline-flex items-center justify-center text-center align-text-middle`}
        >
            {NotificationBadgeContent(badgeType, count)}
>>>>>>> main
        </div>
    );
};
