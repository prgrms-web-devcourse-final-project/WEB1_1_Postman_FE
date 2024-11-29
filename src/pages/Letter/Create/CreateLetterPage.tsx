import { TopBar } from '@/components/Common/TopBar/TopBar';
import { PostLetterForm } from '@/components/Letter/Post/PostLetterForm';
import React from 'react';

export const CreateLetterPage = () => {
    return (
        <div className=" w-[375px] max-w-[768px] h-[815px]">
            <TopBar
                onClick={() => {
                    alert('back~');
                }}
            />
            <PostLetterForm />
        </div>
    );
};
