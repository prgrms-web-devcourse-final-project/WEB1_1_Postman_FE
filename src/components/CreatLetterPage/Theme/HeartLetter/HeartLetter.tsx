import React from 'react';
import { ThemeProps } from '@/types/theme';

export const HeartLetter = ({ children }: ThemeProps) => {
    return (
        <div className="min-h-screen pt-[50px] rounded-t-3xl bg-theme-heart relative">
            {children}
            <div className="absolute flex overflow-hidden pointer-events-none bg-theme-heart bottom-[1px]">
                <img
                    src={'/letter2/letter_bg2_left.2c25d20b.svg'}
                    alt="heart"
                />
                <img
                    src={'/letter2/letter_bg2_right.4315fa8b.svg'}
                    alt="heart"
                />
            </div>
        </div>
    );
};
