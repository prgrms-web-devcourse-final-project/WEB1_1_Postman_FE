import { BannerContainer } from '@/components/Common/BannerContainer/BannerContainer';
import { SliderMenuContainer } from '@/components/Common/SliderMenuContainer/SliderMenuContainer';
import { Toggle } from '@/components/Common/Toggle/Toggle';
import { BottomSheetContent } from '@/components/HomePage/BottomSheet/BottomSheetContent';
import { LetterContainer } from '@/components/HomePage/LetterContainer/LetterContainer';
import { WelcomeMessageContainer } from '@/components/HomePage/WelcomeMessageContainer/WelcomeMessageContainer';
import { useUserStore } from '@/stores/useUserStore';
import { useState } from 'react';
import { TopButtonContainer } from '@/components/HomePage/TopButtonContainer/TopButtonContainer';
import { Loading } from '@/components/Common/Loading/Loading';
import { ToggleVariant } from '@/constants/toggleVariant';
import { useGetThreeLetterData } from '@/hooks/useGetThreeLetterData';
import { ErrorPage } from '../ErrorPage';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { Margin } from '@/components/Common/Margin/Margin';

export const HomePage = () => {
    usePushNotifications(); // 푸시 알림 훅

    const { user } = useUserStore();
    const [open, setOpen] = useState(false);
    const [toggle, setToggle] = useState(true);

    const { letters, isLoading, isError } = useGetThreeLetterData(toggle);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <ErrorPage />;
    }

    return (
        <div className="relative h-full w-full flex flex-col justify-between gap-5 ">
            <div className="z-0">
                <TopButtonContainer />

                <Toggle
                    isChecked={!toggle}
                    onToggle={() => {
                        setToggle(!toggle);
                    }}
                    leftLabel="추천"
                    rightLabel="답장"
                    variant={ToggleVariant.Main}
                />

                <WelcomeMessageContainer
                    nickname={user?.nickname}
                    newLetter={letters.length > 0}
                />

                <LetterContainer letters={letters} />

                <div className="flex justify-center px-20">
                    <button
                        onClick={() => {
                            setOpen(true);
                        }}
                        className="w-full h-[49px] text-white flex-center rounded-full bg-sample-blue"
                    >
                        키워드 설정
                    </button>
                </div>
            </div>

            <div className="relative -mx-5">
                <BannerContainer />
                <Margin bottom={20} />
            </div>

            <SliderMenuContainer
                open={open}
                onDismiss={() => setOpen(false)}
                snapPoints={() => [window.innerHeight * 0.95]}
            >
                <BottomSheetContent
                    onClick={() => {
                        setOpen(false);
                    }}
                    nickname={user?.nickname}
                />
            </SliderMenuContainer>
        </div>
    );
};
