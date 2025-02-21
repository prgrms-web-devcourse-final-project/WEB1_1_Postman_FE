import { NavigationBar } from '@/components/Common/NavigationBar/NavigationBar';
import { TopBar } from '@/components/Common/TopBar/TopBar';
import { LetterDetailContainer } from '@/components/LetterDetailPage/LetterDetailContainer/LetterDetailContainer';

const LetterDetailPage = () => {
    return (
        <div className="w-full min-h-screen">
            <TopBar />
            <LetterDetailContainer />
            <NavigationBar />
        </div>
    );
};

export default LetterDetailPage;
