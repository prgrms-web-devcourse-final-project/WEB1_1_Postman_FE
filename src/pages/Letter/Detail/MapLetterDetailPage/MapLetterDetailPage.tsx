import { NavigationBar } from '@/components/Common/NavigationBar/NavigationBar';
import { TopBar } from '@/components/Common/TopBar/TopBar';
import { MapLetterDetailContainer } from '@/components/LetterDetailPage/LetterDetailContainer/MapLetterDetailContainer/MapLetterDetailContainer';
import { useNavigate } from 'react-router-dom';

export const MapLetterDetailPage = () => {
    const navigate = useNavigate();

    const onBackClick = () => {
        navigate(-1);
    };
    return (
        <div className="w-full h-full">
            <TopBar handleBackClick={onBackClick} />
            <MapLetterDetailContainer />;
            <NavigationBar />
        </div>
    );
};
