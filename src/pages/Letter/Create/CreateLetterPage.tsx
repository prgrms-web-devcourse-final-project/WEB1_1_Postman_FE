import React, { useEffect, useState } from 'react';
import { TopBar } from '@/components/Common/TopBar/TopBar';
import { PostLetterContainer } from '@/components/CreatLetterPage/PostLetterContainer/PostLetterContainer';
import { useToastStore, useDraftLetter, useAutoSave } from '@/hooks';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const CreateLetterPage = () => {
    const [title, setTitle] = useState<string>('');
    const [letter, setLetter] = useState<string>('1');
    const [letterContent, setLetterContent] = useState<string>('');
    const [font, setFont] = useState<string>('initial');

    const { addToast } = useToastStore();
    const navigate = useNavigate();

    const location = useLocation();
    const letterType = location.pathname.split('/')[2];
    const replyType = location.pathname.split('/')[3];

    const { letterId } = useParams<{
        letterId: string;
    }>();

    const { loadDraft, saveDraft } = useDraftLetter(
        title,
        letter,
        letterContent,
        font,
        setTitle,
        setLetter,
        setLetterContent,
        setFont
    );

    useEffect(() => {
        loadDraft();
    }, []);

    useAutoSave(saveDraft, 10000);

    return (
        <div className="w-full h-full">
            <TopBar
                handleSuccesClick={async () => {
                    if (!title.trim() || !letterContent.trim()) {
                        addToast(
                            '공백을 제외한 제목과 내용을 입력해주세요',
                            'warning'
                        );
                        return;
                    }
                    await saveDraft();
                    if (letterType === 'map' && replyType === 'reply') {
                        navigate(`/letter/map/reply/select/${letterId}`);
                    } else if (
                        letterType === 'keyword' &&
                        replyType === 'reply'
                    ) {
                        navigate(`/letter/keyword/reply/select/${letterId}`);
                    } else {
                        navigate('/letter/select');
                    }
                }}
            />
            <PostLetterContainer
                title={title}
                letter={letter}
                letterContent={letterContent}
                font={font}
                setTitle={setTitle}
                setLetter={setLetter}
                setLetterContent={setLetterContent}
                setFont={setFont}
            />
        </div>
    );
};
