import React from 'react';

interface LabelProps {
    imgSrc: string;
}

export const Label = ({ imgSrc }: LabelProps) => {
    return <img src={`/${imgSrc}`} className="w-full h-full object-contain" />;
};
