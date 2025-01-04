// src/components/Letter/Letter.tsx
import { createContext, useContext, ReactNode } from 'react';
import clsx from 'clsx';
import { formatDate } from '@/util/formatDate';
import { TextArea } from '@/components/Common/TextArea/TextArea';
import { useGetKeywordReplyList } from '@/hooks/useGetKeywordReplyList';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Label } from '@/components/Common/BottleLetter/Label/Label';
import { LetterLine } from '@/components/CreatLetterPage/LetterLine/LetterLine';
import { KeywordList } from '../../Keyword/KeywordList';
import { DeleteButton } from '../../Delete/DeleteButton';
import { ReplyList } from '../../ReplyList/ReplyList';
import { ReportButton } from '../../Report/ReportButton';

type LetterData = {
    letterId?: number | string;
    title?: string;
    content: string;
    keywords?: string[];
    createdAt: string;
    font: string;
    label: string;
    isReplied?: boolean;
};

type LetterContextType = {
    letterData: LetterData;
};

const LetterContext = createContext<LetterContextType | null>(null);

const useLetterContext = () => {
    const context = useContext(LetterContext);
    if (!context) {
        throw new Error('Letter 컴포넌트 내부에서만 사용할 수 있습니다');
    }
    return context;
};

// Root 컴포넌트
const Letter = ({
    letterData,
    children
}: {
    letterData: LetterData;
    children: ReactNode;
}) => {
    return (
        <LetterContext.Provider value={{ letterData }}>
            <div className={clsx(letterData.font || 'font-sans', 'mt-5')}>
                <div className="relative z-20 flex flex-col justify-center w-9/12 m-auto py-9">
                    {children}
                </div>
            </div>
        </LetterContext.Provider>
    );
};

// Header 컴포넌트
const Header = () => {
    const { letterData } = useLetterContext();
    const { pathname } = useLocation();
    const reportBtn = pathname.split('/')[4];

    return (
        <div className="absolute top-0 right-0 flex">
            <div className="w-8 -rotate-12">
                <Label imgSrc={letterData.label} />
            </div>
            <DeleteButton />
            {reportBtn === 'received' && <ReportButton />}
        </div>
    );
};

// Title 컴포넌트
const Title = () => {
    const { letterData } = useLetterContext();

    return (
        <>
            <h1>{letterData.title}</h1>
            <LetterLine />
        </>
    );
};

// Content 컴포넌트
const Content = () => {
    const { letterData } = useLetterContext();

    return (
        <div className="relative">
            <TextArea value={letterData.content} isReadonly={true} />
        </div>
    );
};

// Keyword 컴포넌트
const Keyword = () => {
    const { letterData } = useLetterContext();
    const { keywords, createdAt, title, letterId } = letterData;
    const { dataType } = useParams();

    const { data: keywordReplyListData } = useGetKeywordReplyList({
        letterId: Number(letterId) || 0,
        page: 1,
        size: 1,
        sort: 'createdAt'
    });

    return (
        <>
            <div className="flex justify-between w-full mt-6 mb-1">
                {keywords && <p className="font-bold">편지의 키워드</p>}
                <p>{formatDate(createdAt)}</p>
            </div>
            {keywords && <KeywordList keywords={keywords} />}
            {dataType === 'sent' && (
                <ReplyList
                    title={title}
                    keywordReplyListData={keywordReplyListData?.content || []}
                />
            )}
        </>
    );
};

// ReplyButton 컴포넌트
const ReplyButton = () => {
    const { letterData } = useLetterContext();
    const { letterId, isReplied } = letterData;
    const { dataType, letterType } = useParams();
    const navigate = useNavigate();

    if (!(dataType === 'received' && letterType === 'LETTER' && !isReplied)) {
        return null;
    }

    return (
        <button
            className="btn-base z-[10000] bg-sample-blue text-white flex-center rounded-xl h-[40px]"
            onClick={() => navigate(`/letter/keyword/reply/create/${letterId}`)}
        >
            편지에 답장하기
        </button>
    );
};

Letter.Header = Header;
Letter.Title = Title;
Letter.Content = Content;
Letter.Keyword = Keyword;
Letter.ReplyButton = ReplyButton;

export default Letter;
