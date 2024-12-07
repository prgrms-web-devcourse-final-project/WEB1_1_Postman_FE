import { BackButton } from '@/components/Common/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { DeleteButton } from '@/components/LetterDetailPage/Delete/DeleteButton';
import { ReportButton } from '@/components/LetterDetailPage/Report/ReportButton';
import { ReplyLetterDetail } from '@/components/LetterDetailPage/LetterDatail/ReplyLetterDetail';
import { useGetKeywordReplyLetterDetail } from '@/hooks/useGetKeywordReplyLetterDetail';
import { useGetMapReplyLetterDetail } from '@/hooks/useGetMapReplyLetterDetail';

export const ReplyLetterDetailPage = () => {
    const { type, replyLetterId } = useParams<{
        type: 'map' | 'keyword';
        replyLetterId: string;
    }>();

    const imageItem = {
        id: '편지지_샘플_1',
        name: '이미지',
        src: '/편지지_샘플_1.png'
    };
    const labelItem = {
        id: '라벨_샘플',
        name: '이미지',
        src: '/라벨_샘플.png'
    };

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
    console.log(mapReplyData, keywordReplyData);

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

    return (
        <>
            <div className="relative mx-auto max-w">
                <div className="mx-auto w-[710px]">
                    <BackButton onClick={onBackClick} />
                </div>
                {replyLetterId && (
                    <div className="absolute top-0 flex mt-10 right-8">
                        <DeleteButton id={replyLetterId} />
                        <ReportButton id={replyLetterId} />
                    </div>
                )}
                <div className="relative mt-16 flex-center">
                    <img
                        src={imageItem.src}
                        alt={imageItem.name}
                        className=" h-[700px] relative"
                    />
                    <img
                        src={labelItem.src}
                        alt={labelItem.name}
                        className="absolute top-4 translate-x-40 w-[125.32px] h-[201.1px]"
                    />

                    {isMapType && mapReplyData ? (
                        <ReplyLetterDetail letterData={mapReplyData} />
                    ) : keywordReplyData ? (
                        <ReplyLetterDetail letterData={keywordReplyData} />
                    ) : (
                        <div>Error: 편지가 존재하지 않습니다.</div>
                    )}
                </div>
            </div>
        </>
    );
};
