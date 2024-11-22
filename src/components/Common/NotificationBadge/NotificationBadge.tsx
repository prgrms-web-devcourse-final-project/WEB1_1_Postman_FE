import React from 'react';

interface NotificationBadgeProps {
    badgeType: 'basic' | 'dday';
    count: number;
}

export const NotificationBadge = ({
    badgeType,
    count
}: NotificationBadgeProps) => {
    const MAX_COUNT = 99;
    const BaseStyle =
        'inline-flex items-center justify-center text-center align-text-middle';
    const styleMap = {
        basic: 'bg-red-600 px-2 py-1 rounded-full text-white font-semibold',
        dday: 'bg-yellow-400 px-2 py-1 rounded-sm text-white font-semibold'
    };

    const renderContent = ({ type, count }: NotificationBadgeProps) => {
        switch (type) {
            case 'basic':
                if (count > MAX_COUNT) {
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
        <div className={`${BaseStyle} ${styleMap[badgeType]}`}>
            {renderContent(badgeType, count)}
        </div>
    );
};
