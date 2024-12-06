import React from 'react';
import { LabelProps } from '@/types/label';

export const Label = ({ imgSrc, isActive }: LabelProps) => {
    return (
        <div
            className={`w-[80px] h-[100px] flex justify-center items-center border-[1px] rounded-2xl ${
                isActive ? 'border-sample-blue' : 'border-transparent'
            }`}
        >
            <img
                src={`${imgSrc}`}
                className="object-contain w-full h-full p-1"
            />
        </div>
    );
};
