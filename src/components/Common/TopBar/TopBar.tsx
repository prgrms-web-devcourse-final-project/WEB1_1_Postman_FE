import React from 'react';
import { BackButton } from '../BackButton/BackButton';

type TopBaerProps = {
    handleBackClick?: () => void;
    handleSuccesClick?: () => void;
};

export const TopBar = ({
    handleBackClick,
    handleSuccesClick
}: TopBaerProps) => {
    return (
        <div className="z-10 flex items-center justify-between w-full px-4 mt-5 text-2xl ">
            {handleBackClick && <BackButton onClick={handleBackClick} />}
            {handleSuccesClick && (
                <button
                    onClick={handleSuccesClick}
                    className=" bg-sample-blue w-12 text-sm text-white px-2 py-2 rounded-lg"
                >
                    완료
                </button>
            )}
        </div>
    );
};
