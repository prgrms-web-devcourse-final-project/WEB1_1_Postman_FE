import React from 'react';

interface LabelProps {
    imgSrc: string;
}

export const Label = ({ imgSrc }: LabelProps) => {
    return (
        <div className="">
            <img src={`/${imgSrc}`} className="h-[50px]" />
        </div>
    );
};
