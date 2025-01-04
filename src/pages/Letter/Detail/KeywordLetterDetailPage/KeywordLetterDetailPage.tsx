import { NavigationBar } from '@/components/Common/NavigationBar/NavigationBar';
import { TopBar } from '@/components/Common/TopBar/TopBar';
import { KeywordLetterDetailContainer } from '@/components/LetterDetailPage/LetterDetailContainer/KeywordLetterDetailContainer/KeywordLetterDetailContainer';

export const KeywordLetterDetailPage = () => {
    return (
        <div className="w-full min-h-screen">
            <TopBar />
            <KeywordLetterDetailContainer />
            <NavigationBar />
        </div>
    );
};
