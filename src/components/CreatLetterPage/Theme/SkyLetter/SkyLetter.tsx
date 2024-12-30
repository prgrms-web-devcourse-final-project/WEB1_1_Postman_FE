import React from 'react';
import { ThemeProps } from '@/types/theme';
import TopCloud from '@/asset/letter1/top_cloud.svg?react';
import BottomCloud from '@/asset/letter1/bottom_cloud.svg?react';

export const SkyLetter = ({ children }: ThemeProps) => {
    return (
        <div
            className="relative min-h-screen rounded-t-3xl bg-theme-skyblue  pt-[50px]"
            role="region"
            aria-label="하늘색 배경의 편지지"
        >
            <TopCloud
                className="absolute top-0 pointer-events-none "
                aria-hidden="true"
            />
            {children}
            <BottomCloud
                className="absolute bottom-0 pointer-events-none"
                aria-hidden="true"
            />
        </div>
    );
};
