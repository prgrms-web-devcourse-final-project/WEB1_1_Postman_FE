import React, { useEffect } from 'react';
import { useState } from 'react';
import { TopBar } from '@/components/Common/TopBar/TopBar';
import { useNavigate } from 'react-router-dom';
import { ThemeWrapper } from '../ThemeWrapper/ThemeWrapper';
import { LetterInputForm } from '../LetterInputForm/LetterInputForm';
import { useAutoSave, useLetterDB, useToastStore } from '@/hooks';

export const PostLetterContainer = () => {
    const [title, setTitle] = useState<string>('');
    const [letter, setLetter] = useState<string>('1');
    const [letterContent, setLetterContent] = useState<string>('');
    const [font, setFont] = useState<string>('initial');

    const { addToast } = useToastStore();
    const navigate = useNavigate();
    const { saveLetter, getLetter } = useLetterDB();

    // 초기 데이터 로드
    useEffect(() => {
        const loadDraft = async () => {
            try {
                const draft = await getLetter('draft');
                if (draft) {
                    setTitle(draft.title);
                    setLetter(String(draft.theme));
                    setLetterContent(draft.content);
                    setFont(draft.font);
                }
            } catch (error) {
                console.error('드래프트 불러오기 실패:', error);
                addToast('임시저장 불러오기 실패', 'error');
            }
        };

        loadDraft();
    }, [getLetter, addToast]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const saveLetterData = async () => {
        try {
            await saveLetter({
                id: 'draft',
                title,
                content: letterContent,
                font,
                theme: Number(letter),
                lastModified: new Date()
            });
        } catch (error) {
            console.error('저장 실패:', error);
            addToast('임시저장 실패', 'error');
        }
    };

    useAutoSave(saveLetterData, 10000);

    return (
        <>
            <TopBar
                handleSuccesClick={async () => {
                    if (!title.trim() || !letterContent.trim()) {
                        addToast(
                            '공백을 제외한 제목과 내용을 입력해주세요',
                            'warning'
                        );
                        return;
                    }
                    await saveLetterData();
                    navigate('/letter/select');
                }}
            />
            <ThemeWrapper themeId={Number(letter)}>
                <LetterInputForm
                    title={title}
                    handleChange={handleChange}
                    letterContent={letterContent}
                    setLetterContent={setLetterContent}
                    font={font}
                    letter={letter}
                    setFont={setFont}
                    setLetter={setLetter}
                />
            </ThemeWrapper>
        </>
    );
};
