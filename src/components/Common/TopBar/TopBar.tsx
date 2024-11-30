import React from 'react';
import { BackButton } from '../BackButton/BackButton';

type TopBaerProps = { onClick: () => void };

export const TopBar = ({ onClick }: TopBaerProps) => {
    return (
        <div className="fixed z-10 flex items-center justify-between w-full px-4 text-2xl">
            <BackButton onClick={onClick} />
            <p className="">완료</p>
        </div>
    );
};
