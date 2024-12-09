import { useNavigate, useParams } from 'react-router-dom';
import { ThemeWrapper } from '@/components/CreatLetterPage/ThemeWrapper/ThemeWrapper';
import { useToastStore } from '@/hooks';
import { useEffect } from 'react';
import { useKeywordLetterDetail } from '@/hooks/useGetKeywordLetterDetail';
import { useGetKeywordReplyLetterDetail } from '@/hooks/useGetKeywordReplyLetterDetail';
import { KeywordLetterDetail } from '../../LetterDatail/KeywordLetterDetail/KeywordLetterDetail';

export const KeywordLetterDetailContainer = () => {
    const { letterId, replyLetterId, letterType } = useParams<{
        letterId: string;
        letterType: string;
        replyLetterId: string;
    }>();

    const { addToast } = useToastStore();
    const navigate = useNavigate();

    const {
        data: keywordData,
        isLoading: isKeywordLoading,
        error: keywordError
    } = useKeywordLetterDetail({
        letterId: (letterType === 'LETTER' && letterId) || ''
    });

    const {
        data: replyData,
        isLoading: isReplyLoading,
        error: replyError
    } = useGetKeywordReplyLetterDetail({
        replyLetterId:
            letterType === 'REPLY_LETTER'
                ? Number(letterId || replyLetterId)
                : 0
    });

    useEffect(() => {
        const error = keywordError || replyError;
        if (error) {
            addToast(error.message, 'error');
            navigate('/');
        }
    }, [keywordError, replyError, addToast, navigate]);

    if (isKeywordLoading || isReplyLoading) {
        return <div>로딩 중...</div>;
    }

    if (!keywordData && !replyData) {
        return (
            <ThemeWrapper themeId={1}>
                <div>편지가 존재하지 않습니다.</div>
            </ThemeWrapper>
        );
    }

    return (
        <ThemeWrapper
            themeId={Number(keywordData?.paper || replyData?.paper || 1)}
        >
            {letterType === 'LETTER' && keywordData ? (
                <KeywordLetterDetail letterData={keywordData} />
            ) : letterType === 'REPLY_LETTER' && replyData ? (
                <KeywordLetterDetail letterData={replyData} />
            ) : (
                <div>잘못된 접근입니다.</div>
            )}
        </ThemeWrapper>
    );
};
