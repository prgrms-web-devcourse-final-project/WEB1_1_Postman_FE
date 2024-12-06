import React from 'react';
import { ThemeProps } from '@/types/theme';

export const SkyLetter = ({ children }: ThemeProps) => {
    return (
        <div className="relative min-h-screen rounded-t-3xl bg-theme-skyblue  pt-[50px]">
            <img
                src={'/letter1/letter_bg3_top.8be69940.svg'}
                alt="cloud"
                className="absolute top-0 pointer-events-none"
            />
            {children}
            <img
                src={'/letter1/letter_bg3_bottom.d719e174.svg'}
                alt="cloud"
                className="absolute bottom-0 pointer-events-none"
            />
        </div>
    );
};
