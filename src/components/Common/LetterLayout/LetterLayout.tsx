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
import { useGetMapReplyList } from '@/hooks/useGetMapReplyList';
import { usePostNearByLetterStorage } from '@/hooks/usePostNearByLetterStorage';
import { useToastStore } from '@/hooks';

type LetterData = {
    letterId?: number | string;
    title?: string;
    content: string;
    keywords?: string[];
    createdAt: string;
    font: string;
    label: string;
    isReplied?: boolean;
    isArchived?: boolean;
    isTarget?: boolean;
    isOwner?: boolean;
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
    const letterType = pathname.split('/')[3];

    return (
        <div className="absolute top-0 right-0 flex">
            <div className="w-8 -rotate-12">
                <Label imgSrc={letterData.label} />
            </div>
            <DeleteButton />
            {(reportBtn === 'received' ||
                letterType === 'REPLY_LETTER' ||
                letterType === 'received') && <ReportButton />}
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
        <div className="relative ">
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
                    ReplyListData={keywordReplyListData?.content || []}
                />
            )}
        </>
    );
};

// Map 컴포넌트
const Map = () => {
    const { dataType } = useParams();
    const { pathname } = useLocation();
    const { letterData } = useLetterContext();
    const { title } = letterData;
    const replyLetterId = pathname.split('/')[4];

    const { data: mapReplyListData } = useGetMapReplyList({
        letterId: Number(replyLetterId) || 0,
        page: 1,
        size: 9
    });
    return (
        <>
            {dataType === 'sent' && (
                <ReplyList
                    title={title}
                    ReplyListData={mapReplyListData?.content || []}
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
            className="btn-base z-[49] bg-sample-blue text-white mt-2 flex-center rounded-xl h-[40px]"
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
                    <p className="">{formatDate(createdAt)}</p>
                </div>
            </div>
            <div className="flex justify-between">
                <span className="block w-9/12 break-words whitespace-normal">
                    {description}
                </span>
                <span>{DayCounter({ createdAt })}</span>
            </div>
        </>
    );
};

// MapBookmarkReplyButton 컴포넌트

const MapBookmarkReplyButton = () => {
    const { letterData } = useLetterContext();
    const { isReplied, isArchived, isTarget, isOwner } = letterData;
    const { pathname } = useLocation();
    const letterId = pathname.split('/')[4];

    const navigate = useNavigate();
    const postMutation = usePostNearByLetterStorage(Number(letterId));
    const { addToast } = useToastStore();

    const handleStorageAction = () => {
        postMutation.mutate(undefined, {
            onSuccess: (response) => {
                if (response?.isSuccess) {
                    if (response.code === 'COMMON201') {
                        addToast('편지 저장에 성공했습니다.', 'success');
                        localStorage.setItem(
                            `storedLetter-${letterId}`,
                            'true'
                        );
                    } else if (response.code === 'MAP4009') {
                        addToast('편지가 이미 저장되어 있습니다.', 'error');
                        localStorage.setItem(
                            `storedLetter-${letterId}`,
                            'true'
                        );
                    }
                } else {
                    addToast('편지 저장에 실패했습니다.', 'error');
                }
            },
            onError: (error) => {
                console.error('보관 중 오류:', error);
                addToast('편지 저장 중 오류가 발생했습니다.', 'error');
            }
        });
    };

    return (
        <div className="flex-center gap-2 mt-4">
            {!isOwner && !isReplied && (
                <button
                    className="btn-base z-[49] bg-sample-blue text-white flex-center rounded-xl h-[40px]"
                    onClick={() =>
                        navigate(`/letter/map/reply/create/${letterId}`)
                    }
                >
                    편지에 답장하기
                </button>
            )}

            {!isOwner && !isTarget && !isArchived && (
                <button
                    className="btn-base z-[49] bg-white flex-center rounded-xl h-[40px]"
                    onClick={handleStorageAction}
                >
                    보관하기
                </button>
            )}
        </div>
    );
};

LetterLayout.Header = Header;
LetterLayout.Title = Title;
LetterLayout.Content = Content;
LetterLayout.Keyword = Keyword;
LetterLayout.Map = Map;
LetterLayout.ReplyButton = ReplyButton;
LetterLayout.LetterHint = LetterHint;
LetterLayout.MapBookmarkReplyButton = MapBookmarkReplyButton;

export default LetterLayout;
