import { useParams } from 'react-router-dom';
import { useKeywordLetterDetail } from '@/hooks/useGetKeywordLetterDetail';
import { useGetKeywordReplyLetterDetail } from '@/hooks/useGetKeywordReplyLetterDetail';
import Letter from '../../LetterDatail/KeywordLetterDetail/KeywordLetterDetail';
import { ThemeWrapper } from '@/components/CreatLetterPage/ThemeWrapper/ThemeWrapper';

export const KeywordLetterDetailContainer = () => {
    const { letterId, replyLetterId, letterType } = useParams<{
        letterId: string;
        letterType: string;
        replyLetterId: string;
    }>();

    if (letterType === 'LETTER' && letterId) {
        return <OriginalDetailLetter letterId={letterId} />;
    }

    if (letterType === 'REPLY_LETTER' && replyLetterId) {
        return <ReplyDetailLetter replyLetterId={replyLetterId} />;
    }

    return (
        <ThemeWrapper themeId={1}>
            <div>잘못된 편지 타입입니다</div>
        </ThemeWrapper>
    );
};

type OriginalDetailLetterProps = {
    letterId: string;
};

const OriginalDetailLetter = ({ letterId }: OriginalDetailLetterProps) => {
    const { data } = useKeywordLetterDetail({
        letterId
    });

    if (!data) {
        return (
            <ThemeWrapper themeId={1}>
                <div>데이터가 존재하지 않습니다.</div>
            </ThemeWrapper>
        );
    }

    return (
        <ThemeWrapper themeId={Number(data.paper)}>
            <Letter letterData={data}>
                <Letter.Header />
                <Letter.Title />
                <Letter.Content />
                <Letter.Keyword />
                <Letter.ReplyButton />
            </Letter>
        </ThemeWrapper>
    );
};

type ReplyDetailLetterProps = {
    replyLetterId: string;
};

const ReplyDetailLetter = ({ replyLetterId }: ReplyDetailLetterProps) => {
    const { data } = useGetKeywordReplyLetterDetail({
        replyLetterId: replyLetterId
    });

    if (!data) {
        return (
            <ThemeWrapper themeId={1}>
                <div>데이터가 존재하지 않습니다.</div>
            </ThemeWrapper>
        );
    }

    return (
        <ThemeWrapper themeId={Number(data.paper)}>
            <Letter letterData={data}>
                <Letter.Header />
                <Letter.Title />
                <Letter.Content />
                <Letter.Keyword />
                <Letter.ReplyButton />
            </Letter>
        </ThemeWrapper>
    );
};
