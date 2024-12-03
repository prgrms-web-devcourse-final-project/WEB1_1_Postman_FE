import { TopBar } from '@/components/Common/TopBar/TopBar';
import { PostLetterForm } from '@/components/Letter/Post/PostLetterForm';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateLetterPage = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full">
            <TopBar
                handleBackClick={() => {
                    navigate(-1);
                }}
                handelSuccesClick={() => {
                    navigate('/letter/select');
                }}
            />
            <PostLetterForm />
        </div>
    );
};
