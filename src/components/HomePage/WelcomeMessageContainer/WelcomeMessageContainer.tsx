// import { UserType } from '@/types/user';

type WelcomeMessageContainerProps = {
    nickname: string;
    newLetter: boolean;
};

export const WelcomeMessageContainer = ({
    nickname,
    newLetter
}: WelcomeMessageContainerProps) => {
    const userMessage = (
        <span className="text-[#22B8EF]">{`${nickname}님`}</span>
    );

    const message = (
        <p className="font-semibold text-[24px]">
            {newLetter ? (
                <>{userMessage}에게</>
            ) : (
                <>안녕하세요! {userMessage}</>
            )}
        </p>
    );

    const messageBody = newLetter
        ? '편지가 도착했어요.'
        : '아직 도착한 편지가 없어요.';

    const subMessage = newLetter
        ? '답장을 기다리고 있어요.'
        : '떠다니는 편지를 열심히 찾는 중 이에요.';

    return (
        <div className="absolute z-[3]">
            {message}
            <p className="font-semibold text-[24px]">{messageBody}</p>
            <p className="text-base text-[#9D9D9D]">{subMessage}</p>
        </div>
    );
};
