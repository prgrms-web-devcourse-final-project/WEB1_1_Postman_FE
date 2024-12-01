import React from 'react';
import { BackButton } from '../BackButton/BackButton';

type TopBaerProps = {
    handleBackClick?: () => void;
    handelSuccesClick?: () => void;
};

export const TopBar = ({
    handleBackClick,
    handelSuccesClick
}: TopBaerProps) => {
    return (
        <div className="z-10 flex items-center justify-between w-full px-4 mt-5 text-2xl ">
            {handleBackClick && <BackButton onClick={handleBackClick} />}
            {handelSuccesClick && <p onClick={handelSuccesClick}>완료</p>}
        </div>
    );
};
