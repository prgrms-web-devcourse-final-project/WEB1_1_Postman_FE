import { BackButton } from '@/components/Common/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { DeleteButton } from '@/components/LetterDetailPage/Delete/DeleteButton';

import { ReportButton } from '@/components/LetterDetailPage/Report/ReportButton';
import { useKeywordLetterDetail } from '@/hooks/useGetKeywordLetterDetail';
import { MapLetterDetail } from '../LetterDatail/MapLetterDetail';
import { KeywordLetterDetail } from '../LetterDatail/KeywordLetterDetail';
import { ReplyList } from '../ReplyList/ReplyList';
import { ThemeWrapper } from '@/components/CreatLetterPage/ThemeWrapper/ThemeWrapper';
import { TopBar } from '@/components/Common/TopBar/TopBar';

type LetterDetailContainerProps = {
    hasReplies?: boolean;
};

export const LetterDetailContainer = ({
    hasReplies
}: LetterDetailContainerProps) => {
    const { type, letterId } = useParams<{
        type: 'map' | 'keyword';
        letterId: string;
    }>();
    const { data, isLoading, error } = useKeywordLetterDetail({
        letterId: letterId || ''
    });

    const navigate = useNavigate();

    const onBackClick = () => {
        navigate(-1);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error instanceof Error) {
        console.error('error:', error.message);
        return <div>Error: {error.message}</div>;
    }

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
            <TopBar />
            <ThemeWrapper themeId={Number(data!.paper)}>
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
            </ThemeWrapper>
        </>
    );
};
