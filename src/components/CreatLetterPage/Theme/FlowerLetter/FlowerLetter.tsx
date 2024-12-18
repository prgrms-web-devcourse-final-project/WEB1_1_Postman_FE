import React from 'react';
import { ThemeProps } from '@/types/theme';

export const FlowerLetter = ({ children }: ThemeProps) => {
    return (
        <div className="min-h-screen pt-[50px] rounded-t-3xl bg-theme-flower relative">
            {children}
            <div className="flex justify-between overflow-hidden pointer-events-none ">
                <img
                    src={'/letter3/bg1_mobile.99e45830.svg'}
                    alt="flowr"
                    className="pointer-events-none"
                />
                <img
                    src={'/letter3/bg2_mobile.16ef09f6.svg'}
                    alt="flower"
                    className="pointer-events-none"
                />
            </div>
        </div>
    );
};
