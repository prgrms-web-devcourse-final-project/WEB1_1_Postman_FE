import { TopBar } from '@/components/Common/TopBar/TopBar';
import { useNavigate, useParams } from 'react-router-dom';
import { ReplyLetterDetail } from '@/components/LetterDetailPage/LetterDatail/ReplyLetterDetail';
import { useGetKeywordReplyLetterDetail } from '@/hooks/useGetKeywordReplyLetterDetail';
import { useGetMapReplyLetterDetail } from '@/hooks/useGetMapReplyLetterDetail';
import { ThemeWrapper } from '@/components/CreatLetterPage/ThemeWrapper/ThemeWrapper';

export const ReplyLetterDetailPage = () => {
    const { type, replyLetterId } = useParams<{
        type: 'map' | 'keyword';
        replyLetterId: string;
    }>();

    const navigate = useNavigate();
    const isMapType = type === 'map';

    const {
        data: keywordReplyData,
        isLoading: isKeywordLoading,
        error: keywordError
    } = useGetKeywordReplyLetterDetail({
        replyLetterId: replyLetterId ? Number(replyLetterId) || 0 : 0
    });

    const {
        data: mapReplyData,
        isLoading: isMapLoading,
        error: mapError
    } = useGetMapReplyLetterDetail({
        letterId: replyLetterId ? Number(replyLetterId) || 0 : 0
    });

    if (isKeywordLoading || isMapLoading) {
        return <div>Loading...</div>;
    }

    if (!isMapType && keywordError instanceof Error) {
        console.error('Keyword Error:', keywordError.message);
        return <div>Error: 키워드 답장 편지가 존재하지 않습니다.</div>;
    }

    if (isMapType && mapError instanceof Error) {
        console.error('Map Error:', mapError.message);
        return (
            <div>
                Error: 지도 답장 데이터를 가져오는 중 문제가 발생했습니다.
            </div>
        );
    }

    const onBackClick = () => {
        navigate(-1);
    };

    const letterData = isMapType ? mapReplyData : keywordReplyData;

    return (
        <div className="w-full min-h-screen">
            <TopBar handleBackClick={onBackClick} />
            <ThemeWrapper
                themeId={Number(
                    mapReplyData?.paper || keywordReplyData?.paper || 1
                )}
            >
                {letterData ? (
                    <div className="relative mx-auto max-w">
                        <div className="relative mt-16 flex-center">
                            <ReplyLetterDetail letterData={letterData} />
                        </div>
                    </div>
                ) : (
                    <div>Error: 편지가 존재하지 않습니다.</div>
                )}
            </ThemeWrapper>
        </div>
    );
};
