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
                    className="w-12 px-2 py-2 text-sm text-white rounded-lg  bg-sample-blue"
                >
                    완료
                </button>
            )}
        </div>
    );
};
