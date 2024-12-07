import { NavigationBar } from '@/components/Common/NavigationBar/NavigationBar';
import { TopBar } from '@/components/Common/TopBar/TopBar';
import { MapLetterArchieveDetailContainer } from '@/components/LetterDetailPage/LetterDetailContainer/MapLetterArchieveDetailContainer/MapLetterArchieveDetailContainer';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const MapLetterArchieveDetailContainerPage = () => {
    const navigate = useNavigate();

    const onBackClick = () => {
        navigate(-1);
    };

    return (
        <div className="w-full min-h-screen">
            <TopBar handleBackClick={onBackClick} />
            <MapLetterArchieveDetailContainer />
            <NavigationBar />
        </div>
    );
};
