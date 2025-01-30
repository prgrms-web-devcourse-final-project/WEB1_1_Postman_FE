import React from 'react';
import { ThemeProps } from '@/types/theme';
import LeftFlower from '@/assets/letter3/bg1_mobile.99e45830.svg';
import RightFlower from '@/assets/letter3/bg2_mobile.16ef09f6.svg';
export const FlowerLetter = ({ children }: ThemeProps) => {
    return (
        <div className="min-h-screen pt-[50px] rounded-t-3xl bg-theme-flower relative">
            {children}
            <div className="absolute flex overflow-hidden pointer-events-none bg-theme-flower bottom-[1px] justify-between w-full">
                <img
                    src={LeftFlower}
                    alt="flower"
                    className="pointer-events-none"
                />
                <img
                    src={RightFlower}
                    alt="flower"
                    className="pointer-events-none"
                />
            </div>
        </div>
    );
};
