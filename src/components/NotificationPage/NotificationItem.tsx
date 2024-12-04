import { NotificationProps } from '@/types/notification';
import { match } from 'ts-pattern';
import { Margin } from '../Common/Margin/Margin';

export const NotificationItem = ({
    type,
    createdAt,
    letterId,
    isRead
}: NotificationProps) => {
    // 메인 메시지
    const notificatioMessage = match(type)
        .with('NEW_LETTER', () => '새로운 편지가 도착했어요')
        .with('TARGET_LETTER', () => '지도 편지가 도착했어요')
        .with('REPLY_LETTER', () => '답장이 도착했어요')
        .with('WARNING', () => '규정에 맞는 편지를 작성해주세요')
        .with('BAN', () => '정지된 계정입니다')
        .run();

    // 부 메시지
    const subNotificationMessage = match(type)
        .with('WARNING', () => '경고')
        .with('BAN', () => '정지')
        .otherwise(() => '나에게 온 편지');

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

    // todo : 라벨 이미지 및 상세보기 라우팅 경로 지정
    const letterLink = `/detail/${letterId}`;

    // 읽음 여부에 따라 스타일 : 투명도 조절
    const isReadStyle = `flex gap-3 items-center ${
        isRead ? 'opacity-30' : 'opacity-100'
    }`;

    return (
        <div className={isReadStyle}>
            <img
                className="size-[44px] bg-slate-400 rounded-full"
                src=""
                alt=""
            />
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
