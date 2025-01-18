// src/components/Letter/Letter.tsx
import { createContext, useContext, ReactNode } from 'react';
import clsx from 'clsx';
import { formatDate } from '@/util/formatDate';
import { TextArea } from '@/components/Common/TextArea/TextArea';
import { useGetKeywordReplyList } from '@/hooks/useGetKeywordReplyList';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Label } from '@/components/Common/BottleLetter/Label/Label';
import { LetterLine } from '@/components/CreatLetterPage/LetterLine/LetterLine';
import { DayCounter } from '@/components/Common/DayCounter/DayCounter';
import { KeywordList } from '@/components/LetterDetailPage/Keyword/KeywordList';
import { DeleteButton } from '@/components/LetterDetailPage/Delete/DeleteButton';
import { ReportButton } from '@/components/LetterDetailPage/Report/ReportButton';
import { ReplyList } from '@/components/LetterDetailPage/ReplyList/ReplyList';
import { LetterInput } from '@/components/CreatLetterPage/LetterInput/LetterInput';

type LetterData = {
    letterId: number | string;
    title: string;
    content: string;
    keywords?: string[];
    createdAt?: string;
    font: string;
    label?: string;
    isReplied?: boolean;
    description?: string;
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
const LetterLayout = ({
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

    if (!letterData.label) {
        return null;
    }

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

type TitleProps = {
    handleChangeTitle?: (title: string) => void;
    placeholder?: string;
    maxLength?: number;
};
// Title 컴포넌트
const Title = ({ handleChangeTitle, placeholder, maxLength }: TitleProps) => {
    const { letterData } = useLetterContext();

    return (
        <>
            <LetterInput
                value={letterData.title}
                handleChangeTitle={handleChangeTitle}
                placeholder={placeholder}
                maxLength={maxLength}
            />

            <LetterLine />
        </>
    );
};

// Content 컴포넌트 수정
interface ContentProps {
    isReadonly?: boolean;
    handleChangeContent?: (Content: string) => void;
}

// Content 컴포넌트
const Content = ({ handleChangeContent }: ContentProps) => {
    const { letterData } = useLetterContext();

    return (
        <div className="relative">
            <TextArea
                value={letterData.content}
                setValue={handleChangeContent}
            />
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
                <p>{createdAt && formatDate(createdAt)}</p>
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

// Hint 컴포넌트
const LetterHint = () => {
    const { letterData } = useLetterContext();
    const { createdAt, description } = letterData;

    return (
        <>
            <div className="flex justify-between w-full mt-6">
                <p className="font-bold ">장소 힌트</p>
                <div>
                    <p className="">{createdAt && formatDate(createdAt)}</p>
                </div>
            </div>
            <div className="flex justify-between">
                <span className="block w-9/12 break-words whitespace-normal">
                    {description}
                </span>
                <span>{createdAt && DayCounter({ createdAt })}</span>
            </div>
        </>
    );
};

LetterLayout.Header = Header;
LetterLayout.Title = Title;
LetterLayout.Content = Content;
LetterLayout.Keyword = Keyword;
LetterLayout.ReplyButton = ReplyButton;
LetterLayout.LetterHint = LetterHint;
export default LetterLayout;
