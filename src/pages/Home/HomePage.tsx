import { BannerContainer } from '@/components/Common/BannerContainer/BannerContainer';
import { SliderMenuContainer } from '@/components/Common/SliderMenuContainer/SliderMenuContainer';
import { Toggle } from '@/components/Common/Toggle/Toggle';
import { BottomSheetContent } from '@/components/HomePage/BottomSheetContent/BottomSheetContent';
import { LetterContainer } from '@/components/HomePage/LetterContainer/LetterContainer';
import { TopButtonContainer } from '@/components/HomePage/TopButtonContainer/TopButtonContainer';
import { WelcomeMessageContainer } from '@/components/HomePage/WelcomeMessageContainer/WelcomeMessageContainer';
import { useHomeSheetStore } from '@/stores/index';
import { Container } from '@/components/Common/Container/Container';
import { useState } from 'react';

export const HomePage = () => {
    // const { user } = useUserStore();
    const { open, setOpen } = useHomeSheetStore();

    const [toggle, setToggle] = useState(true);

    function onDismiss() {
        setOpen(false);
    }

    return (
        <Container>
            <div className="flex flex-col gap-5">
                <TopButtonContainer />
                <Toggle
                    isChecked={toggle}
                    onToggle={() => {
                        setToggle(!toggle);
                    }}
                    leftLabel="추천"
                    rightLabel="답장"
                />

                <div>
                    <WelcomeMessageContainer nickname={'Dummy'} newLetter />
                    <LetterContainer />
                </div>

                <div className="flex justify-center px-20">
                    <button
                        onClick={() => {
                            setOpen(true);
                        }}
                        className="w-full h-[49px] text-sample-blue flex-center rounded-full border border-sample-blue"
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
                    <BottomSheetContent nickname={'Dummy'} />
                </SliderMenuContainer>
            </div>
        </Container>
    );
};
