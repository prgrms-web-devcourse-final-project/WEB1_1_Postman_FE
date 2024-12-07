import { useNavigate, useParams } from 'react-router-dom';
import { ThemeWrapper } from '@/components/CreatLetterPage/ThemeWrapper/ThemeWrapper';
import { useToastStore } from '@/hooks';
import { useEffect } from 'react';
import { useNearbyLettersDetail } from '@/hooks/useGetNearbyLettersDetail';
import { MapLetterDetail } from '../../LetterDatail/MapLetterDetail/MapLetterDetail';

export const MapLetterDetailContainer = () => {
    const { letterId, lat, lot } = useParams<{
        letterId: string;
        lat: string;
        lot: string;
    }>();

    const { addToast } = useToastStore();

    const navigate = useNavigate();

    const {
        data: mapData,
        isLoading: isMapLoading,
        error: mapError
    } = useNearbyLettersDetail({
        letterId: letterId || '',
        latitude: lat || '',
        longitude: lot || ''
    });

    useEffect(() => {
        if (mapError) {
            addToast(mapError.message, 'error');
            navigate('/');
        }
    }, [mapError, addToast]);

    if (isMapLoading) {
        return <div>로딩 중...</div>;
    }

    if (!mapData) {
        return (
            <ThemeWrapper themeId={1}>
                <div>지도 편지를 가져오는 중 문제가 발생했습니다.</div>
            </ThemeWrapper>
        );
    }

    return (
        <ThemeWrapper themeId={Number(mapData.paper)}>
            <MapLetterDetail letterData={mapData} />
        </ThemeWrapper>
    );
};
