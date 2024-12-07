import { formatDate } from '@/util/formatDate';
import { TextArea } from '@/components/Common/TextArea/TextArea';
import { Margin } from '@/components/Common/Margin/Margin';
import { KeywordList } from '../../Keyword/KeywordList';
import { DeleteButton } from '../../Delete/DeleteButton';
import clsx from 'clsx';
import { useGetKeywordReplyList } from '@/hooks/useGetKeywordReplyList';
import { ReplyList } from '../../ReplyList/ReplyList';

type KeywordLetterDetailProps = {
    letterData: {
        letterId: number;
        title: string;
        content: string;
        keywords: string[];
        createdAt: string;
        font: string;
    };
};

export const KeywordLetterDetail = ({
    letterData
}: KeywordLetterDetailProps) => {
    const { letterId, title, content, keywords, createdAt, font } = letterData;

    const {
        data: keywordReplyListData,
        isLoading: isKeywordReplyListDataLoading,
        error: keywordReplyListDataError
    } = useGetKeywordReplyList({
        letterId: letterId || 0,
        page: 1,
        size: 1,
        sort: 'createdAt'
    });

    if (isKeywordReplyListDataLoading) {
        return <div>로딩 중...</div>;
    }

    if (keywordReplyListDataError instanceof Error) {
        return <div>오류...: {keywordReplyListDataError.message}</div>;
    }


    return (
        <div className={clsx(font ? font : 'font-sans')}>
            <Margin top={20} />
            <div className="relative z-20 flex flex-col justify-center w-9/12 m-auto py-9">
                <div className="absolute top-0 right-0">
                    <DeleteButton />
                </div>
                <h1>{title}</h1>
                <img src={'/to_line.f4c129e6.svg'} className="w-full" />

                <div className="relative">
                    <TextArea value={content} font={font} isReadonly={true} />
                </div>

                <Margin top={30} />
                <div className="flex justify-between w-full ">
                    <p className="font-bold ">편지의 키워드</p>
                    <p className="">{formatDate(createdAt)}</p>
                </div>
                <KeywordList keywords={keywords} />
                <Margin bottom={30} />
            </div>

            {keywordReplyListData?.content ? (
                <div className="mt-16  mx-auto">
                    <ReplyList
                        keywordReplyListData={keywordReplyListData.content}
                    />
                </div>
            ) : null}
        </div>
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
