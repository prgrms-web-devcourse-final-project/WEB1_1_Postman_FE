import React from 'react';

export const AnimationBottle = () => {
    return (
        <div className="flex justify-center w-full">
            <img
                src="/유리병.svg"
                className="object-contain w-[35%] h-[35%] animate-wiggle animate-infinite animate-ease-linear"
            />
        </div>
    );
};
