import { match } from 'ts-pattern';
import { Margin } from '../Common/Margin/Margin';
import { NotificationItemItemProps } from '@/types/notification';
import { useNavigate } from 'react-router-dom';
import markerIcon from '../../assets/map_marker.svg';
import warningIcon from '../../assets/warning.svg';
import bottleIcon from '../../assets/bottle.svg';

export const NotificationItem = ({
    type,
    createdAt,
    letterId,
    isRead
}: NotificationItemItemProps) => {
    const navigate = useNavigate();

    const handleClickNotification = () => {
        navigate(letterLink);
    };
    // 메인 메시지
    const notificatioMessage = match(type)
        .with('NEW_LETTER', () => '새로운 익명의 편지가 도착했어요')
        .with('TARGET_LETTER', () => '사용자님에게 편지가 도착했어요')
        .with('KEYWORD_REPLY', () => '떠나보낸 편지에 답장이 도착했어요')
        .with('MAP_REPLY', () => '떠나보낸 편지에 답장이 도착했어요')
        .with('WARNING', () => '규정을 준수하며 서비스를 이용해주세요')
        .with('BAN', () => '정지된 계정입니다')
        .run();

    // 부 메시지
    const subNotificationMessage = match(type)
        .with('NEW_LETTER', () => '나에게 온 편지')
        .with('TARGET_LETTER', () => '지도 위 편지')
        .with('KEYWORD_REPLY', () => '되돌아 온 편지')
        .with('MAP_REPLY', () => '되돌아 온 편지')
        .with('WARNING', () => '경고!')
        .with('BAN', () => '정지!')
        .run();

    const icon = match(type)
        .with('NEW_LETTER', () => bottleIcon)
        .with('TARGET_LETTER', () => markerIcon)
        .with('KEYWORD_REPLY', () => bottleIcon)
        .with('MAP_REPLY', () => bottleIcon)
        .with('WARNING', () => warningIcon)
        .with('BAN', () => warningIcon)
        .run();

    const letterLink = match(type)
        .with('NEW_LETTER', () => `/letter/keyword/LETTER/received/${letterId}`)
        // .with('TARGET_LETTER', () => `/letter/keyword/LETTER/received/${letterId}`)
        // .with('KEYWORD_REPLY', () => `/letter/keyword/REPLY_LETTER/${letterId}`) // api에서 받은 편지 id 값이 답장편지의 id가 아닌 내가보낸 편지의 id가 옴
        .otherwise(() => '');

    /** 알람 받고 얼마나 지났는지 */
    const timeSinceAlert = (dateString: string): string => {
        const eventDate = new Date(dateString);
        const currentDate = new Date();

        const diffInMilliseconds = currentDate.getTime() - eventDate.getTime();

        // 분
        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
        // 시간
        const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
        // 일
        const diffInDays = Math.floor(
            diffInMilliseconds / (1000 * 60 * 60 * 24)
        );

        if (diffInMinutes < 1) return `방금`;

        if (diffInMinutes < 60) return `${diffInMinutes}분 전`;

        if (diffInHours < 24) return `${diffInHours}시간 전`;

        if (diffInDays == 1) return `어제`;

        return `${diffInDays}일 전`;
    };

    // 읽음 여부에 따라 스타일 : 투명도 조절 및 빨간 점 추가
    const isReadStyle = `flex gap-4 items-center ${isRead ? 'opacity-50' : 'opacity-100'}`;
    const isReadDot = <div className="size-2 rounded-full bg-[#FF0D0D]" />;

    return (
        <div onClick={handleClickNotification} className={isReadStyle}>
            {type !== 'WARNING' && type !== 'BAN' ? (
                <img className="size-[34px]" src={icon} />
            ) : null}

            <div className="w-full">
                <div className="flex items-center justify-between text-caption text-sample-textgray">
                    <div className="flex gap-2 items-center">
                        {subNotificationMessage} {!isRead ? isReadDot : null}
                    </div>
                    <p>{timeSinceAlert(createdAt)}</p>
                </div>

                <Margin top={1} />

                <p className="text-[16px]">{notificatioMessage}</p>

                <Margin top={3} />

                {type !== 'WARNING' && type !== 'BAN' ? (
                    <p className="text-caption text-sample-select">
                        바로 확인하기
                    </p>
                ) : null}
            </div>
        </div>
    );
};
