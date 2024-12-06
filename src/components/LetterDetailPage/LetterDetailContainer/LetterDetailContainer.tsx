import { BackButton } from '@/components/Common/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { DeleteButton } from '@/components/LetterDetailPage/Delete/DeleteButton';
import { ReportButton } from '@/components/LetterDetailPage/Report/ReportButton';
import { useKeywordLetterDetail } from '@/hooks/useGetKeywordLetterDetail';
import { MapLetterDetail } from '../LetterDatail/MapLetterDetail';
import { KeywordLetterDetail } from '../LetterDatail/KeywordLetterDetail';
import { ReplyList } from '../ReplyList/ReplyList';
import { useNearbyLettersDetail } from '@/hooks/useGetNearbyLettersDetail';

type LetterDetailContainerProps = {
    hasReplies?: boolean;
};

export const LetterDetailContainer = ({
    hasReplies
}: LetterDetailContainerProps) => {
    const { type, letterId, lat, lot } = useParams<{
        type: 'map' | 'keyword';
        letterId: string;
        lat: string;
        lot: string;
    }>();
    console.log('Type:', type, 'Letter ID:', letterId);
    const navigate = useNavigate();

    const isMapType = type === 'map';

    const {
        data: keywordData,
        isLoading: isKeywordLoading,
        error: keywordError
    } = useKeywordLetterDetail({
        letterId: !isMapType ? letterId || '' : ''
    });

    const {
        data: mapData,
        isLoading: isMapLoading,
        error: mapError
    } = useNearbyLettersDetail({
        letterId: letterId ? Number(letterId) || 0 : 0,
        longitude: lot || '',
        latitude: lat || ''
    });

    console.log(mapData);

    if (isKeywordLoading || isMapLoading) {
        return <div>Loading...</div>;
    }
    if (!isMapType && keywordError instanceof Error) {
        console.error('Keyword Error:', keywordError.message);
        return <div>Error: 키워드 편지가 존재하지 않습니다.</div>;
    }

    if (isMapType && mapError instanceof Error) {
        console.error('Map Error:', mapError.message);
        return <div>Error: 지도 데이터를 가져오는 중 문제가 발생했습니다.</div>;
    }

    const onBackClick = () => {
        navigate(-1);
    };

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

    const sampleReplies = [
        { id: 1, title: '답장 제목 1', date: '24.11.28' },
        { id: 2, title: '답장 제목 2', date: '24.11.29' },
        { id: 3, title: '답장 제목 3', date: '24.11.30' }
    ];

    return (
        <>
            <div className="relative mx-auto mt-4 max-w">
                <div className="mx-auto w-[710px]">
                    <BackButton onClick={onBackClick} />
                </div>
                {letterId && (
                    <div className="absolute top-0 flex mt-10 right-8">
                        <DeleteButton id={letterId} />
                        {!keywordData?.isOwner && (
                            <ReportButton id={letterId} />
                        )}
                    </div>
                )}
                <div className="relative mt-16 flex-center">
                    <img
                        src={imageItem.src}
                        alt={imageItem.name}
                        className="w-[710px] h-[900px] relative"
                    />
                    <img
                        src={labelItem.src}
                        alt={labelItem.name}
                        className="absolute top-4 translate-x-40 w-[125.32px] h-[201.1px]"
                    />
                    {isMapType && mapData ? (
                        <MapLetterDetail letterData={mapData} />
                    ) : keywordData ? (
                        <KeywordLetterDetail letterData={keywordData} />
                    ) : (
                        <div>Error: 편지가 존재하지 않습니다.</div>
                    )}
                </div>
            </div>

            {keywordData?.isOwner ? (
                hasReplies ? (
                    <div className="mt-16 w-[710px] mx-auto">
                        <ReplyList replies={sampleReplies} />
                    </div>
                ) : null
            ) : isMapType ? (
                <div className="gap-4 mx-auto mt-4 flex-center max-w">
                    {!mapData?.isOwner && (
                        <>
                            <button className="btn-base rounded-3xl w-[339.82px] h-[80px]">
                                보관하기
                            </button>
                            <button className="btn-base rounded-3xl w-[339.82px] h-[80px]">
                                편지에 답장하기
                            </button>
                        </>
                    )}
                </div>
            ) : (
                <div className="gap-4 mx-auto mt-4 flex-center max-w">
                    {!keywordData?.isOwner && (
                        <button className="btn-base rounded-3xl w-[700px] h-[80px]">
                            편지에 답장하기
                        </button>
                    )}
                </div>
            )}
        </>
    );
};
