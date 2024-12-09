import { match } from 'ts-pattern';
import { Margin } from '../Common/Margin/Margin';
import { NotificationItemItemProps } from '@/types/notification';
import { useNavigate } from 'react-router-dom';

export const NotificationItem = ({
    type,
    createdAt,
    letterId,
    isRead,
    label
}: NotificationItemItemProps) => {
    const navigate = useNavigate();

    const handleClickNotification = () => {
        navigate(letterLink);
    };
    // 메인 메시지
    const notificatioMessage = match(type)
        .with('NEW_LETTER', () => '새로운 익명의 편지가 도착했어요')
        .with('TARGET_LETTER', () => '나에게 편지가 도착했어요')
        .with('KEYWORD_REPLY', () => '내가 쓴 편지에 답장이 도착했어요')
        .with('MAP_REPLY', () => '내가 쓴 편지에 답장이 도착했어요')
        .with('WARNING', () => '규정에 맞는 편지를 작성해주세요')
        .with('BAN', () => '정지된 계정입니다')
        .run();

    // 부 메시지
    const subNotificationMessage = match(type)
        .with('WARNING', () => '경고')
        .with('BAN', () => '정지')
        .otherwise(() => '나에게 온 편지');

    const letterLink = match(type)
        .with('NEW_LETTER', () => `/letter/keyword/LETTER/received/${letterId}`)
        .with(
            'KEYWORD_REPLY',
            () => `/letter/keyword/REPLY_LETTER/received/${letterId}`
        )
        .otherwise(() => '');

    /** 알람 받고 얼마나 지났는지 */
    const timeSinceAlert = (dateString: string): string => {
        const eventDate = new Date(dateString);
        const currentDate = new Date();

        const diffInMilliseconds = currentDate.getTime() - eventDate.getTime();
        const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
        const diffInDays = Math.floor(
            diffInMilliseconds / (1000 * 60 * 60 * 24)
        );

        if (diffInHours < 24) {
            return `${diffInHours}시간 전`;
        } else {
            return `${diffInDays}일 전`;
        }
    };

    // 읽음 여부에 따라 스타일 : 투명도 조절
    const isReadStyle = `flex gap-3 items-center ${
        isRead ? 'opacity-30' : 'opacity-100'
    }`;

    return (
        <div onClick={handleClickNotification} className={isReadStyle}>
            {type !== 'WARNING' && type !== 'BAN' ? (
                <img
                    className="size-[44px] bg-slate-400 rounded-full"
                    src={label}
                    alt=""
                />
            ) : null}

            <div className="w-full">
                <div className="flex items-center justify-between">
                    <p className="text-[16px] overflow-hidden">
                        {notificatioMessage}
                    </p>
                    <p className="text-[13px] overflow-hidden">
                        {timeSinceAlert(createdAt)}
                    </p>
                </div>

                <Margin top={5} />

                <p className="text-[13px] overflow-hidden">
                    {subNotificationMessage}
                </p>
            </div>
        </div>
    );
};
