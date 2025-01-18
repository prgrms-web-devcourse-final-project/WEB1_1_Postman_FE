import React, { useCallback, useEffect, useState } from 'react';
import { TopBar } from '@/components/Common/TopBar/TopBar';
import { useToastStore, useDraftLetter, useAutoSave } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { ThemeWrapper } from '@/components/CreatLetterPage/ThemeWrapper/ThemeWrapper';
import { SelectSlider } from '@/components/SelectItemPage/SelectSlider/SelectSlider';
import LetterLayout from '@/components/Common/LetterLayout/LetterLayout';

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

    useAutoSave(saveDraft, 10000);

    const handleChangeTitle = useCallback((title: string) => {
        setTitle(title);
    }, []);

    const handleChangeContent = useCallback((content: string) => {
        setLetterContent(content);
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
            <ThemeWrapper themeId={Number(letter)}>
                <LetterLayout
                    letterData={{
                        letterId: letter,
                        title: title,
                        font: font,
                        content: letterContent
                    }}
                >
                    <LetterLayout.Title
                        handleChangeTitle={handleChangeTitle}
                        placeholder={'제목을 입력해주세요'}
                        maxLength={20}
                    />
                    <LetterLayout.Content
                        isReadonly={false}
                        handleChangeContent={handleChangeContent}
                    />
                </LetterLayout>
                <SelectSlider
                    font={font}
                    letter={letter}
                    setFont={setFont}
                    setLetter={setLetter}
                />
            </ThemeWrapper>
        </div>
    );
};
