import { useLocation, useParams } from 'react-router-dom';
import { useKeywordLetterDetail } from '@/hooks/useGetKeywordLetterDetail';
import { useGetKeywordReplyLetterDetail } from '@/hooks/useGetKeywordReplyLetterDetail';
import { ThemeWrapper } from '@/components/CreatLetterPage/ThemeWrapper/ThemeWrapper';
import { useGetArchivedLetter } from '@/hooks';
import { useGetMapReplyLetterDetail } from '@/hooks/useGetMapReplyLetterDetail';
import { useNearbyLettersDetail } from '@/hooks/useGetNearbyLettersDetail';
import LetterLayout from '@/components/Common/LetterLayout/LetterLayout';

export const LetterDetailContainer = () => {
    const { letterId, replyLetterId, letterType, dataType, lat, lot } =
        useParams<{
            letterId: string;
            letterType: string;
            replyLetterId: string;
            dataType: string;
            lat: string;
            lot: string;
        }>();

    const { pathname } = useLocation();
    const letterPathType = pathname.split('/')[2];

    if (letterPathType === 'keyword') {
        if (letterType === 'LETTER' && letterId) {
            return <KeywordSentDetailLetter letterId={letterId} />;
        }

        if (letterType === 'REPLY_LETTER' && letterId) {
            return <KeywordReplyDetailLetter replyLetterId={letterId} />;
        }
    }

    if (letterPathType === 'map') {
        if (letterId && (dataType === 'sent' || dataType === 'received')) {
            return <MapArchivedSentDetailLetter letterId={letterId} />;
        }

        if (letterId) {
            return <MapBookmarkDetailLetter letterId={letterId} />;
        }

        if (replyLetterId) {
            return (
                <MapArchivedSentReplyDetailLetter
                    replyLetterId={replyLetterId}
                />
            );
        }

        if (lat && lot && letterId) {
            return <MapDetailLetter letterId={letterId} lat={lat} lot={lot} />;
        }
    }

    return (
        <ThemeWrapper themeId={1}>
            <div>잘못된 편지 타입입니다</div>
        </ThemeWrapper>
    );
};

type SentDetailLetterProps = {
    letterId: string;
};

const KeywordSentDetailLetter = ({ letterId }: SentDetailLetterProps) => {
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
            <LetterLayout letterData={data}>
                <LetterLayout.Header />
                <LetterLayout.Title />
                <LetterLayout.Content />
                <LetterLayout.Keyword />
                <LetterLayout.ReplyButton />
            </LetterLayout>
        </ThemeWrapper>
    );
};

type KeywordReplyDetailLetterProps = {
    replyLetterId: string;
};

const KeywordReplyDetailLetter = ({
    replyLetterId
}: KeywordReplyDetailLetterProps) => {
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
            <LetterLayout letterData={data}>
                <LetterLayout.Header />
                <LetterLayout.Title />
                <LetterLayout.Content />
                <LetterLayout.Keyword />
                <LetterLayout.ReplyButton />
            </LetterLayout>
        </ThemeWrapper>
    );
};

type MapSentDetailLetterProps = {
    letterId: string;
};

const MapArchivedSentDetailLetter = ({
    letterId
}: MapSentDetailLetterProps) => {
    const { data } = useGetArchivedLetter({
        letterId: letterId
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
            <LetterLayout letterData={data}>
                <LetterLayout.Header />
                <LetterLayout.Title />
                <LetterLayout.Content />
                <LetterLayout.LetterHint />
            </LetterLayout>
        </ThemeWrapper>
    );
};

type ReplyMapDetailLetterProps = {
    replyLetterId: string;
};

const MapArchivedSentReplyDetailLetter = ({
    replyLetterId
}: ReplyMapDetailLetterProps) => {
    const { data } = useGetMapReplyLetterDetail({
        letterId: replyLetterId
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
            <LetterLayout letterData={data}>
                <LetterLayout.Header />
                <LetterLayout.Title />
                <LetterLayout.Content />
                <LetterLayout.LetterHint />
            </LetterLayout>
        </ThemeWrapper>
    );
};

type MapDetailLetterProps = {
    letterId: string;
    lat: string;
    lot: string;
};

const MapDetailLetter = ({ letterId, lat, lot }: MapDetailLetterProps) => {
    const { data } = useNearbyLettersDetail({
        letterId: letterId,
        latitude: lat,
        longitude: lot
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
            <LetterLayout letterData={data}>
                <LetterLayout.Header />
                <LetterLayout.Title />
                <LetterLayout.Content />
                <LetterLayout.LetterHint />
            </LetterLayout>
        </ThemeWrapper>
    );
};

type MapBookmarkDetailLetterProps = {
    letterId: string;
};
const MapBookmarkDetailLetter = ({
    letterId
}: MapBookmarkDetailLetterProps) => {
    const { data } = useGetArchivedLetter({
        letterId: letterId
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
            <LetterLayout letterData={data}>
                <LetterLayout.Header />
                <LetterLayout.Title />
                <LetterLayout.Content />
                <LetterLayout.LetterHint />
            </LetterLayout>
        </ThemeWrapper>
    );
};
