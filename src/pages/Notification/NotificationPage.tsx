import { Margin } from '@/components/Common/Margin/Margin';
import { TitleClosedTopBar } from '@/components/Common/TitleClosedTopBar/TitleClosedTopBar';
import { NotificationContainer } from '@/components/NotificationPage/NotificationContainer';
import { NotificationType } from '@/types/notification';

export const NotificationPage = () => {
    const dummy = [
        {
            id: 'ba017e82-022e-4a82-94db-f0c5d22ef318',
            type: 'NEW_LETTER',
            receiver: 99,
            createdAt: '2024-12-03T18:20:38.6242079',
            letterId: 1,
            isRead: false
        },
        {
            id: 'ba017e82-022e-4a82-94db-f0c5d22ef318',
            type: 'TARGET_LETTER',
            receiver: 99,
            createdAt: '2024-12-03T11:20:38.6242079',
            letterId: 1,
            isRead: false
        },
        {
            id: '8f6f7748-dfd7-46b2-8e1f-4dff4abc8ab9',
            type: 'WARNING',
            receiver: 99,
            createdAt: '2024-12-02T11:17:16.7813547',
            letterId: null,
            isRead: true
        },
        {
            id: 'ba017e82-022e-4a82-94db-f0c5d22ef318',
            type: 'NEW_LETTER',
            receiver: 99,
            createdAt: '2024-12-02T11:20:38.6242079',
            letterId: 1,
            isRead: true
        },
        {
            id: 'ba017e82-022e-4a82-94db-f0c5d22ef318',
            type: 'REPLY_LETTER',
            receiver: 99,
            createdAt: '2024-12-01T19:20:38.6242079',
            letterId: 1,
            isRead: true
        },
        {
            id: 'ba017e82-022e-4a82-94db-f0c5d22ef318',
            type: 'NEW_LETTER',
            receiver: 99,
            createdAt: '2024-12-01T11:20:38.6242079',
            letterId: 1,
            isRead: true
        }
    ];

    // 읽지 않은 알림 : isRead = false
    const unReadNotifications = [...dummy]
        .filter((notification) => !notification.isRead)
        .map(({ type, createdAt, letterId, isRead }) => ({
            type: type as NotificationType,
            createdAt,
            letterId: letterId ?? 0, // null일 경우 0
            isRead
        }));

    // 읽은 알림 : isRead = true
    const readNotifications = [...dummy]
        .filter((notification) => notification.isRead)
        .map(({ type, createdAt, letterId, isRead }) => ({
            type: type as NotificationType,
            createdAt,
            letterId: letterId ?? 0, // null일 경우 0
            isRead
        }));

    return (
        <>
            <Margin top={20} />
            <TitleClosedTopBar title="알림" />
            <Margin top={20} />
            <div>
                <h3 className="text-[14px] text-[#22B8EF]">새로운 소식</h3>
                <Margin top={8} />
                <NotificationContainer notifications={unReadNotifications} />
            </div>
            <Margin top={20} />
            <div>
                <h3 className="text-[14px] text-[#22B8EF]">이전 알림</h3>
                <Margin top={8} />
                <NotificationContainer notifications={readNotifications} />
            </div>
        </>
    );
};
