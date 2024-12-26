import React, { useEffect, useState } from 'react';
import { TopBar } from '@/components/Common/TopBar/TopBar';
import { PostLetterContainer } from '@/components/CreatLetterPage/PostLetterContainer/PostLetterContainer';
import { useToastStore, useDraftLetter } from '@/hooks';
import { useNavigate } from 'react-router-dom';

export const CreateLetterPage = () => {
    const [title, setTitle] = useState<string>('');
    const [letter, setLetter] = useState<string>('1');
    const [letterContent, setLetterContent] = useState<string>('');
    const [font, setFont] = useState<string>('initial');

    const { addToast } = useToastStore();
    const navigate = useNavigate();

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
                    navigate('/letter/select');
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
