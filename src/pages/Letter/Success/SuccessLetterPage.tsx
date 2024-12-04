import { CreateButton } from '@/components/SelectItemPage/CreateButton/CreateButton';
import { SuccessModal } from '@/components/SuccessLetterPage/SuccessModal/SuccessModal';
import confetti from 'canvas-confetti';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SuccessLetterPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    confetti({
        angle: 130,
        particleCount: 50,
        spread: 50,
        origin: { x: 0.5, y: 0.7 }
    });

    confetti({
        angle: 50,
        particleCount: 50,
        spread: 50,
        origin: { x: 0.5, y: 0.7 }
    });

    return (
        <div className="relative flex flex-col justify-between h-screen">
            <div className="absolute inset-0 flex items-center justify-center">
                <SuccessModal />
            </div>

            <div className="absolute w-full bottom-[34px] px-4">
                <CreateButton isActive={true} handleClickHandler={handleClick}>
                    {'확인'}
                </CreateButton>
            </div>
        </div>
    );
};
