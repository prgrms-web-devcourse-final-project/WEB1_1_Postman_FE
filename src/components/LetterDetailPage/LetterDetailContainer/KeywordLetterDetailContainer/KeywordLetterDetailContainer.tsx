import { useNavigate, useParams } from 'react-router-dom';
import { ThemeWrapper } from '@/components/CreatLetterPage/ThemeWrapper/ThemeWrapper';
import { useToastStore } from '@/hooks';
import { useEffect } from 'react';
import { useKeywordLetterDetail } from '@/hooks/useGetKeywordLetterDetail';
import { KeywordLetterDetail } from '../../LetterDatail/KeywordLetterDetail/KeywordLetterDetail';

export const KeywordLetterDetailContainer = () => {
    const { letterId } = useParams<{ letterId: string }>();

    const { addToast } = useToastStore();

    const navigate = useNavigate();

    const {
        data: keywordData,
        isLoading: isKeywordLoading,
        error: keywordError
    } = useKeywordLetterDetail({
        letterId: letterId || ''
    });

    useEffect(() => {
        if (keywordError) {
            addToast(keywordError.message, 'error');
            navigate('/');
        }
    }, [keywordError, addToast]);

    if (isKeywordLoading) {
        return <div>로딩 중...</div>;
    }

    if (!keywordData) {
        return (
            <ThemeWrapper themeId={1}>
                <div>키워드 편지가 존재하지 않습니다.</div>
            </ThemeWrapper>
        );
    }

    return (
        <ThemeWrapper themeId={Number(keywordData.paper)}>
            <KeywordLetterDetail letterData={keywordData} />
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
