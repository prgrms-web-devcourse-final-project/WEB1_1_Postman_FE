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
        <div className="">
            <Margin top={210} />
            <SuccessModal />
            <Margin top={230} />
            <CreateButton isActive={true} handleClickHandler={handleClick} />
        </div>
    );
};
