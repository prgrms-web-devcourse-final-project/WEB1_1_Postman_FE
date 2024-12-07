import { useParams } from 'react-router-dom';
import { useKeywordLetterDetail } from '@/hooks/useGetKeywordLetterDetail';
import { ThemeWrapper } from '@/components/CreatLetterPage/ThemeWrapper/ThemeWrapper';
import { useToastStore } from '@/hooks';
import { useEffect } from 'react';
import { KeywordLetterDetail } from '../LetterDatail/KeywordLetterDetail';
import { MapLetterDetail } from '../LetterDatail/MapLetterDetail';
import { useNearbyLettersDetail } from '@/hooks/useGetNearbyLettersDetail';

export const LetterDetailContainer = () => {
    const { type, letterId, lat, lot } = useParams<{
        type: 'map' | 'keyword';
        letterId: string;
        lat: string;
        lot: string;
    }>();

    const { addToast } = useToastStore();
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
        letterId: isMapType ? Number(letterId) || 0 : 0,
        longitude: lot || '',
        latitude: lat || ''
    });

    useEffect(() => {
        if (keywordError) {
            addToast(keywordError.message, 'error');
        }
        if (mapError) {
            addToast(mapError.message, 'error');
        }
    }, [keywordError, mapError, addToast]);

    if (isKeywordLoading || isMapLoading) {
        return <div>로딩 중...</div>;
    }

    if (!isMapType && !keywordData) {
        return (
            <ThemeWrapper themeId={1}>
                <div>키워드 편지가 존재하지 않습니다.</div>
            </ThemeWrapper>
        );
    }

    if (isMapType && !mapData) {
        return (
            <ThemeWrapper themeId={1}>
                <div>지도 편지를 가져오는 중 문제가 발생했습니다.</div>
            </ThemeWrapper>
        );
    }

    // 정말 죄송합니다 나중에 쓸 변수들인데 지금 안 쓰면 빌드 오류라서 일단 콘솔로 작성했습니다.
    console.log(type);
    // console.log(hasReplies);

    return (
        <ThemeWrapper
            themeId={Number(isMapType ? mapData?.paper : keywordData?.paper)}
        >
            {isMapType
                ? mapData && <MapLetterDetail letterData={mapData} />
                : keywordData && (
                      <KeywordLetterDetail letterData={keywordData} />
                  )}
        </ThemeWrapper>
    );
};

/*
   <div className="relative mx-auto mt-4 max-w">
                    {letterId && (
                        <div className="absolute top-0 flex mt-10 right-8">
                            <DeleteButton id={letterId} />
                            {!data?.isOwner && <ReportButton id={letterId} />}
                        </div>
                    )}
                    <div className="relative mt-16 flex-center">
                        <img
                            src={labelItem.src}
                            alt={labelItem.name}
                            className="absolute top-4 translate-x-40 w-[125.32px] h-[201.1px]"
                        />
                        {type === 'map' ? (
                            <MapLetterDetail
                                title="편지제목"
                                content="편지내용"
                                date="24.11.18"
                                place="서울시 종로구 평창동"
                                hint="서대문역 앞 붕어빵 가게에서"
                            />
                        ) : (
                            data && <KeywordLetterDetail letterData={data} />
                        )}
                    </div>
                </div>

                {data?.isOwner ? (
                    hasReplies ? (
                        <div className="mt-16 w-[710px]  mx-auto">
                            <ReplyList replies={sampleReplies} />
                        </div>
                    ) : null
                ) : type === 'map' ? (
                    <div className="gap-4 mx-auto mt-4 flex-center max-w">
                        {!data?.isOwner && (
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
                        {!data?.isOwner && (
                            <button className="btn-base rounded-3xl w-[700px] h-[80px]">
                                편지에 답장하기
                            </button>
                        )}
                    </div>
                )}
*/
