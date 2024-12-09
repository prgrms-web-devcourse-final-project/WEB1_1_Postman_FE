import React from 'react';
import { useState } from 'react';
import { TopBar } from '@/components/Common/TopBar/TopBar';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ThemeWrapper } from '../ThemeWrapper/ThemeWrapper';
import { LetterInputForm } from '../LetterInputForm/LetterInputForm';
import { useAutoSave, useToastStore } from '@/hooks';

export const PostLetterCotainer = () => {
    const { setValue: saveTitle, storedValue: storedTitle } = useLocalStorage(
        'title',
        ''
    );
    const { setValue: saveLetterContent, storedValue: storedContent } =
        useLocalStorage('letterContent', '');
    const { setValue: saveFont, storedValue: storedFont } = useLocalStorage(
        'font',
        ''
    );
    const { setValue: saveLetter, storedValue: storedLetter } = useLocalStorage(
        'letter',
        ''
    );

    const { addToast } = useToastStore();

    const [title, setTitle] = useState<string>(storedTitle || ' ');
    const [letter, setLetter] = useState<string>(storedLetter || '1');
    const [letterContent, setLetterContent] = useState<string>(
        storedContent || ' '
    );
    const [font, setFont] = useState<string>(storedFont || 'initial');

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setTitle(inputValue);
    };

    const saveLetterData = () => {
        saveTitle(title);
        saveLetterContent(letterContent);
        saveFont(font);
        saveLetter(letter);
    };

    useAutoSave(saveLetterData, 10000);

    return (
        <>
            <TopBar
                handleBackClick={() => {
                    navigate(-1);
                }}
                handleSuccesClick={() => {
                    if (!title.trim() || !letterContent.trim()) {
                        addToast(
                            '공백을 제외한 제목과 내용을 입력해주세요',
                            'warning'
                        );
                        return;
                    }
                    saveLetterData();
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
