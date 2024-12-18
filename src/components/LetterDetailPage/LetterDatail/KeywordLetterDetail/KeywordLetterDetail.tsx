import { formatDate } from '@/util/formatDate';
import { TextArea } from '@/components/Common/TextArea/TextArea';
import { Margin } from '@/components/Common/Margin/Margin';
import { KeywordList } from '../../Keyword/KeywordList';
import { DeleteButton } from '../../Delete/DeleteButton';
import clsx from 'clsx';
// import { useGetKeywordReplyList } from '@/hooks/useGetKeywordReplyList';
// import { ReplyList } from '../../ReplyList/ReplyList';
import { ReportButton } from '../../Report/ReportButton';
import { useParams, useNavigate } from 'react-router-dom';
import { Label } from '@/components/Common/BottleLetter/Label/Label';

type KeywordLetterDetailProps = {
    letterData: {
        letterId?: number | string;
        title?: string;
        content: string;
        keywords?: string[];
        createdAt: string;
        font: string;
        label: string;
        isReplied?: boolean;
    };
};

export const KeywordLetterDetail = ({
    letterData
}: KeywordLetterDetailProps) => {
    const { dataType, letterType } = useParams<{
        dataType: string;
        letterType: string;
    }>();
    const navigate = useNavigate();
    const {
        letterId,
        title,
        content,
        keywords,
        createdAt,
        font,
        label,
        isReplied
    } = letterData;

    // const {
    //     data: keywordReplyListData,
    //     isLoading: isKeywordReplyListDataLoading,
    //     error: keywordReplyListDataError
    // } = useGetKeywordReplyList({
    //     letterId: Number(letterId) || 0,
    //     page: 1,
    //     size: 1,
    //     sort: 'createdAt'
    // });

    // if (isKeywordReplyListDataLoading) {
    //     return <div>로딩 중...</div>;
    // }

    // if (keywordReplyListDataError instanceof Error) {
    //     return <div>오류...: {keywordReplyListDataError.message}</div>;
    // }

    return (
        <div className={clsx(font ? font : 'font-sans')}>
            <Margin top={20} />

            <div className="relative z-20 flex flex-col justify-center w-9/12 m-auto py-9">
                <div className="absolute top-0 right-0 flex">
                    <div className="w-8 -rotate-12">
                        <Label imgSrc={label} />
                    </div>
                    <DeleteButton />
                    {letterType === 'REPLY_LETTER' && <ReportButton />}
                </div>
                <h1>{title}</h1>
                <img src={'/to_line.f4c129e6.svg'} className="w-full" />

                <div className="relative">
                    <TextArea value={content} font={font} isReadonly={true} />
                </div>

                <Margin top={30} />
                <div className="flex justify-between w-full ">
                    {keywords && <p className="font-bold ">편지의 키워드</p>}
                    <p className="">{formatDate(createdAt)}</p>
                </div>
                {keywords && <KeywordList keywords={keywords} />}
                <Margin bottom={5} />
                {/* {dataType === 'sent' && keywordReplyListData?.content ? (
                    <div className="mx-auto mt-16">
                        <ReplyList
                            keywordReplyListData={keywordReplyListData.content}
                        />
                    </div>
                ) : null} */}

                {dataType === 'received' &&
                    letterType === 'LETTER' &&
                    !isReplied && (
                        <button
                            className="btn-base z-[10000] bg-sample-blue text-white flex-center rounded-xl h-[40px]"
                            onClick={() =>
                                navigate(
                                    `/letter/keyword/reply/create/${letterId}`
                                )
                            }
                        >
                            편지에 답장하기
                        </button>
                    )}
            </div>
        </div>
    );
};
