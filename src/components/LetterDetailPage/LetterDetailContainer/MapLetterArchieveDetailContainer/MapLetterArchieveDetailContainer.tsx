import { useNavigate, useParams } from 'react-router-dom';
import { ThemeWrapper } from '@/components/CreatLetterPage/ThemeWrapper/ThemeWrapper';
import { useToastStore } from '@/hooks';
import { useEffect } from 'react';
import { useGetArchivedLetter } from '@/hooks';
import { MapLetterArchieveDetail } from '../../LetterDatail/MapLetterArchieveDetail/MapLetterArchieveDetail';
import { useGetMapReplyLetterDetail } from '@/hooks/useGetMapReplyLetterDetail';
import { Loading } from '@/components/Common/Loading/Loading';

export const MapLetterArchieveDetailContainer = () => {
    const { letterId, replyLetterId, dataType } = useParams<{
        letterId: string;
        letterType: string;
        dataType: string;
        replyLetterId: string;
    }>();
    const { addToast } = useToastStore();
    const navigate = useNavigate();

    const {
        data: mapData,
        isLoading: isMapLoading,
        error: mapError
    } = useGetArchivedLetter({
        letterId: (dataType !== 'REPLY_LETTER' && Number(letterId)) || 0
    });

    const {
        data: replyData,
        isLoading: isReplyLoading,
        error: replyError
    } = useGetMapReplyLetterDetail({
        letterId:
            dataType === 'REPLY_LETTER' ? Number(replyLetterId || letterId) : 0
    });

    useEffect(() => {
        const error = mapError || replyError;
        if (error) {
            addToast(error.message, 'error');
            navigate('/');
        }
    }, [mapError, replyError, addToast, navigate]);

    if (isMapLoading || isReplyLoading) {
        return (
            <div className="flex flex-1 w-full h-full">
                <Loading />
            </div>
        );
    }

    if (!mapData && !replyData) {
        return (
            <ThemeWrapper themeId={1}>
                <div>지도 편지가 존재하지 않습니다.</div>
            </ThemeWrapper>
        );
    }

    return (
        <ThemeWrapper themeId={Number(mapData?.paper || replyData?.paper || 1)}>
            {dataType !== 'REPLY_LETTER' && mapData ? (
                <MapLetterArchieveDetail
                    letterData={mapData}
                    letterId={letterId || ''}
                />
            ) : dataType === 'REPLY_LETTER' && replyData ? (
                <MapLetterArchieveDetail
                    letterData={replyData}
                    letterId={replyLetterId || ''}
                />
            ) : (
                <div>잘못된 접근입니다.</div>
            )}
        </ThemeWrapper>
    );
};
