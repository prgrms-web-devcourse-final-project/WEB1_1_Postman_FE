import { NavigationBar } from '@/components/Common/NavigationBar/NavigationBar';
import { TopBar } from '@/components/Common/TopBar/TopBar';
import { KeywordLetterDetailContainer } from '@/components/LetterDetailPage/LetterDetailContainer/KeywordLetterDetailContainer/KeywordLetterDetailContainer';
import { useNavigate } from 'react-router-dom';

export const KeywordLetterDetailPage = () => {
    const navigate = useNavigate();

    const onBackClick = () => {
        navigate(-1);
    };
    return (
        <div className="w-full min-h-screen">
            <TopBar handleBackClick={onBackClick} />
            <KeywordLetterDetailContainer />;
            <NavigationBar />
        </div>
    );
};
