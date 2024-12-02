import { BannerContainer } from '@/components/Common/BannerContainer/BannerContainer';
import { SliderMenuContainer } from '@/components/Common/SliderMenuContainer/SliderMenuContainer';
import { Toggle } from '@/components/Common/Toggle/Toggle';
import { BottomSheetContent } from '@/components/HomePage/BottomSheetContent/BottomSheetContent';
import { LetterContainer } from '@/components/HomePage/LetterContainer/LetterContainer';
import { TopButtonContainer } from '@/components/HomePage/TopButtonContainer/TopButtonContainer';
import { WelcomeMessageContainer } from '@/components/HomePage/WelcomeMessageContainer/WelcomeMessageContainer';
import { useUserStore, useHomeSheetStore } from '@/stores/index';
import { useState } from 'react';

export const HomePage = () => {
    const { user } = useUserStore();
    const { open, setOpen } = useHomeSheetStore();

    const [toggle, setToggle] = useState(true);

    function onDismiss() {
        setOpen(false);
    }

    return (
        <div className="p-5 flex flex-col gap-[30px]">
            <TopButtonContainer />

            <Toggle
                isChecked={toggle}
                onToggle={() => {
                    setToggle(!toggle);
                }}
            />

            <div>
                <WelcomeMessageContainer user={user} newLetter />
                <LetterContainer />
            </div>

            <div className="flex justify-center">
                <button
                    onClick={() => {
                        setOpen(true);
                    }}
                    className="btn-base w-[180px] h-[60px] flex-center"
                >
                    키워드 설정
                </button>
            </div>

            <div className="mx-[-20px]">
                <BannerContainer />
            </div>

            <SliderMenuContainer
                open={open}
                onDismiss={onDismiss}
                snapPoints={() => [window.innerHeight * 0.95]}
            >
                <BottomSheetContent user={user} />
            </SliderMenuContainer>
        </div>
    );
};
