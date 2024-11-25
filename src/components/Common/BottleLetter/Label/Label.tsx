import React from 'react';

interface LabelProps {
    imgSrc: string;
}

export const Label = ({ imgSrc }: LabelProps) => {
<<<<<<< HEAD
    return <img src={`/${imgSrc}`} className="object-contain w-full h-full" />;
=======
    return (
        <div className="">
            <img src={`/${imgSrc}`} className="h-[50px]" />
        </div>
    );
>>>>>>> main
};
