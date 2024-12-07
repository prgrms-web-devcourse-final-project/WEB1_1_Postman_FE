import { useNavigate, useParams } from 'react-router-dom';
import { ThemeWrapper } from '@/components/CreatLetterPage/ThemeWrapper/ThemeWrapper';
import { useToastStore } from '@/hooks';
import { useEffect } from 'react';
import { useGetArchivedLetter } from '@/hooks';
import { MapLetterArchieveDetail } from '../../LetterDatail/MapLetterArchieveDetail/MapLetterArchieveDetail';

export const MapLetterArchieveDetailContainer = () => {
    const { letterId } = useParams<{
        letterId: string;
    }>();

    const { addToast } = useToastStore();

    const navigate = useNavigate();

    const {
        data: mapData,
        isLoading: isMapLoading,
        error: mapError
    } = useGetArchivedLetter(letterId || '');

    useEffect(() => {
        if (mapError) {
            addToast(mapError.message, 'error');
            navigate('/');
        }
    }, [mapError, addToast]);

    if (isMapLoading) {
        return <div>로딩 중...</div>;
    }

    if (!mapData || !letterId) {
        return (
            <ThemeWrapper themeId={1}>
                <div>지도 편지를 가져오는 중 문제가 발생했습니다.</div>
            </ThemeWrapper>
        );
    }

    return (
        <ThemeWrapper themeId={Number(mapData.result.paper)}>
            <MapLetterArchieveDetail
                letterData={mapData.result}
                letterId={letterId}
            />
        </ThemeWrapper>
    );
};
