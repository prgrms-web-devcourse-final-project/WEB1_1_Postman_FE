import React from 'react';
import { LabelProps } from '@/types/lable';

export const Label = ({ imgSrc }: LabelProps) => {
    return <img src={`/${imgSrc}`} className="object-contain w-full h-full" />;
};
