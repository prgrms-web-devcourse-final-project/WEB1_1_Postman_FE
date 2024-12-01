import React from 'react';
import { LabelProps } from '@/types/label';

export const Label = ({ imgSrc, isActive }: LabelProps) => {
    return (
        <div
            className={`w-full h-full flex justify-center items-center  ${
                isActive
                    ? 'bg-slate-500 rounded-lg'
                    : 'bg-transparent rounded-none'
            }`}
        >
            <img src={`/${imgSrc}`} className="object-contain w-full h-full" />
        </div>
    );
};
