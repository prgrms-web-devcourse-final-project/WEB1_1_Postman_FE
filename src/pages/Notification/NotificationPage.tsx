import { Margin } from '@/components/Common/Margin/Margin';
import { TitleClosedTopBar } from '@/components/Common/TitleClosedTopBar/TitleClosedTopBar';
import { NotificationContainer } from '@/components/NotificationPage/NotificationContainer';
import { ZeroNotification } from '@/components/NotificationPage/ZeroNotification';
import { useGetNotifications } from '@/hooks/useGetNotifications';
import { useUpdateNotificationStatus } from '@/hooks/useUpdateNotifications';
import { NotificationType } from '@/types/notification';

export const NotificationPage = () => {
    const { data, isLoading, isError } = useGetNotifications();

    // 상태 업데이트
    useUpdateNotificationStatus();

    if (isLoading) return <p>알림 로딩 중...</p>;
    if (isError) return <p>알림 로딩 실패!</p>;

    const dummy = data?.result || [];

    // 읽지 않은 알림 : isRead = false
    const unReadNotifications = [...dummy]
        .filter((notification) => !notification.isRead)
        .map(({ type, createdAt, letterId, isRead, label }) => ({
            type: type as NotificationType,
            createdAt,
            letterId,
            isRead,
            label
        }));

    // 읽은 알림 : isRead = true
    const readNotifications = [...dummy]
        .filter((notification) => notification.isRead)
        .map(({ type, createdAt, letterId, isRead, label }) => ({
            type: type as NotificationType,
            createdAt,
            letterId,
            isRead,
            label
        }));

    return (
        <>
            <Margin top={20} />
            <TitleClosedTopBar title="알림" />
            <Margin top={20} />
            <div>
                <h3 className="text-[14px] text-[#22B8EF]">새로운 소식</h3>
                <Margin top={8} />
                {unReadNotifications.length > 0 ? (
                    <NotificationContainer
                        notifications={unReadNotifications}
                    />
                ) : (
                    <ZeroNotification />
                )}
            </div>
            <Margin top={20} />
            <div>
                <h3 className="text-[14px] text-[#22B8EF]">이전 알림</h3>
                <Margin top={8} />
                {readNotifications.length > 0 ? (
                    <NotificationContainer notifications={readNotifications} />
                ) : (
                    <ZeroNotification />
                )}
            </div>
        </>
    );
};
