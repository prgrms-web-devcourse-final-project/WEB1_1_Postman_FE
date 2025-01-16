// import { UserType } from '@/types/user';

type WelcomeMessageContainerProps = {
    nickname: string | undefined;
    newLetter: boolean;
    toggleType: '추천' | '답장';
};

export const WelcomeMessageContainer = ({
    nickname,
    newLetter,
    toggleType
}: WelcomeMessageContainerProps) => {
    if (nickname === undefined) nickname = '';

    const userMessage = (
        <span className="font-semibold">{`${nickname}님`}</span>
    );

    const message = (
        <p className="text-white font-medium text-display">
            {newLetter ? (
                <>{userMessage}에게</>
            ) : (
                <>안녕하세요! {userMessage}</>
            )}
        </p>
    );

    const messageBody = newLetter
        ? `${toggleType === '추천' ? '편지가' : '답장이'} 도착했어요`
        : '아직 도착한 편지가 없어요';

    const subMessage = newLetter
        ? '읽지 않은 편지들이 기다리고 있어요!'
        : '떠다니는 편지를 열심히 찾는 중 이에요';

    return (
        <>
            {message}
            <p className="font-medium text-white text-display">{messageBody}</p>
            <p className="font-light text-sample text-[rgba(255,255,255,0.7)]">
                {subMessage}
            </p>
        </>
    );
};
