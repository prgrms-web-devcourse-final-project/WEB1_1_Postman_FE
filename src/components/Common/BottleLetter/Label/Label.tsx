import React from 'react';

interface LabelProps {
    imgSrc: string;
}

export const Label = ({ imgSrc }: LabelProps) => {
    return <img src={`/${imgSrc}`} className="object-contain w-full h-full" />;
};
