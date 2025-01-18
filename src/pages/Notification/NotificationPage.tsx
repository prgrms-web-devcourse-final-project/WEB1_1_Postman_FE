import { Loading } from '@/components/Common/Loading/Loading';
import { Margin } from '@/components/Common/Margin/Margin';
import { NotificationContainer } from '@/components/NotificationPage/NotificationContainer';
import { ZeroNotification } from '@/components/NotificationPage/ZeroNotification';
import { useGetNotifications } from '@/hooks/useGetNotifications';
import { useUpdateNotificationStatus } from '@/hooks/useUpdateNotifications';
import { NotificationType } from '@/types/notification';
import { ErrorPage } from '../ErrorPage';
import { TitleBackTopBar } from '@/components/Common/TitleBackTopBar/TitleBackTopBar';

export const NotificationPage = () => {
    const { data, isLoading, isError } = useGetNotifications();

    useUpdateNotificationStatus();

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <ErrorPage />;
    }

    const notifications = data?.result || [];

    // 읽지 않은 알림 : isRead = false
    const unReadNotifications = [...notifications]
        .filter((notification) => !notification.isRead)
        .map(({ type, createdAt, letterId, isRead, label }) => ({
            type: type as NotificationType,
            createdAt,
            letterId,
            isRead,
            label
        }));

    // 읽은 알림 : isRead = true
    const readNotifications = [...notifications]
        .filter((notification) => notification.isRead)
        .map(({ type, createdAt, letterId, isRead, label }) => ({
            type: type as NotificationType,
            createdAt,
            letterId,
            isRead,
            label
        }))
        .slice(0, 5);

    return (
        <>
            <Margin top={20} />
            <TitleBackTopBar title="알림함" />
            <Margin top={20} />
            <div>
                <h3 className="text-title3 text-sample-black">새로운 소식</h3>
                <Margin top={20} />
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
                <h3 className="text-title3 text-sample-black">이전 소식</h3>
                <Margin top={20} />
                {readNotifications.length > 0 ? (
                    <NotificationContainer notifications={readNotifications} />
                ) : (
                    <ZeroNotification />
                )}
            </div>
        </>
    );
};
