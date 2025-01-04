import { NavigationBar } from '@/components/Common/NavigationBar/NavigationBar';
import { LetterDetailContainer } from '@/components/LetterDetailPage/LetterDetailContainer/LetterDetailContainer';

const LetterDetailPage = () => {
    return (
        <div className="w-full min-h-screen">
            <LetterDetailContainer />
            <NavigationBar />
        </div>
    );
};

export default LetterDetailPage;
