import { Margin } from '@/components/Common/Margin/Margin';
import { CreateButton } from '@/components/Letter/CreateButton/CreateButton';
import { SuccessModal } from '@/components/Letter/SuccessModal/SuccessModal';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SuccessLetterPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };
    return (
        <div className="relative flex flex-col justify-between h-screen">
            <div className="absolute inset-0 flex items-center justify-center">
                <SuccessModal />
            </div>

            <div className="absolute w-full bottom-5">
                <CreateButton isActive={true} handleClickHandler={handleClick}>
                    {'확인'}
                </CreateButton>
            </div>
        </div>
    );
};
