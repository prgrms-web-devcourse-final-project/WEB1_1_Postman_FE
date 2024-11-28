import { BannerContainer } from '@/components/Common/BannerContainer/BannerContainer';
import { Toggle } from '@/components/Common/Toggle/Toggle';
import { LetterContainer } from '@/components/HomePage/LetterContainer/LetterContainer';
import { TopButtonContainer } from '@/components/HomePage/TopButtonContainer/TopButtonContainer';
import { WelcomeMessageContainer } from '@/components/HomePage/WelcomeMessageContainer/WelcomeMessageContainer';
import { useUserStore } from '@/stores/useUserStore';
import { useState } from 'react';

export const HomePage = () => {
    const { user } = useUserStore();
    const [toggle, setToggle] = useState(true);

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
                <button className="btn-base w-[180px] h-[60px] flex-center">
                    키워드 설정
                </button>
            </div>
            <div className="">
                <BannerContainer />
            </div>
        </div>
    );
};
