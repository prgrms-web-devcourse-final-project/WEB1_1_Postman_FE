import React from 'react';
import { BackButton } from '../BackButton/BackButton';
import { useNavigate } from 'react-router-dom';

type TopBaerProps = {
    handleSuccesClick?: () => void;
};

export const TopBar = ({ handleSuccesClick }: TopBaerProps) => {
    const navigate = useNavigate();

    return (
        <div className="z-10 flex items-center justify-between w-full px-4 mt-5 mb-2 text-2xl">
            <BackButton
                onClick={() => {
                    navigate(-1);
                }}
            />
            {handleSuccesClick && (
                <button
                    onClick={handleSuccesClick}
                    className="w-12 px-2 py-2 text-sm text-white rounded-lg bg-sample-blue"
                    aria-label="완료"
                >
                    완료
                </button>
            )}
        </div>
    );
};
