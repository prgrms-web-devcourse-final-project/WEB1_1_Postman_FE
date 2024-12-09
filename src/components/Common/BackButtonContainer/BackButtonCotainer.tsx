import { BackButton } from '@/components/Common/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';

export const BackButtonCotainer = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className="w-full flex flex-row justify-start">
            <BackButton onClick={handleBackClick} />
        </div>
    );
};
