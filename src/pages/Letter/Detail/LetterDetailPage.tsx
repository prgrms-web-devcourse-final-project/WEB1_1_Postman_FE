import { NavigationBar } from '@/components/Common/NavigationBar/NavigationBar';
import { TopBar } from '@/components/Common/TopBar/TopBar';
import { LetterDetailContainer } from '@/components/LetterDetailPage/LetterDetailContainer/LetterDetailContainer';
import { useNavigate } from 'react-router-dom';

export const LetterDetailPage = () => {
    const navigate = useNavigate();

    const onBackClick = () => {
        navigate(-1);
    };
    return (
        <div className="w-full h-full">
            <TopBar handleBackClick={onBackClick} />
            <LetterDetailContainer />;
            <NavigationBar />
        </div>
    );
};
