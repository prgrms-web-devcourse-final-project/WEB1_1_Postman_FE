import React, { useState } from 'react';
import { LabelProps } from '@/types/lable';

export const Label = ({ imgSrc }: LabelProps) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <div
            onClick={handleClick}
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
