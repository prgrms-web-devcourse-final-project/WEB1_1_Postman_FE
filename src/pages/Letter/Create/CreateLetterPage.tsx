import { TopBar } from '@/components/Common/TopBar/TopBar';
import { PostLetterForm } from '@/components/Letter/Post/PostLetterForm';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateLetterPage = () => {
    const navigate = useNavigate();

    return (
        <div className=" w-[375px] max-w-[768px] h-[815px]">
            <TopBar
                handleBackClick={() => {
                    navigate('/');
                }}
                handelSuccesClick={() => {
                    navigate('/letter/select');
                }}
            />
            <PostLetterForm />
        </div>
    );
};
