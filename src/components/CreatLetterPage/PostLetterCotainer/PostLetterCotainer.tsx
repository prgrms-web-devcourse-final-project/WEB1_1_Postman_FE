import React from 'react';
import { useState } from 'react';
import { TopBar } from '@/components/Common/TopBar/TopBar';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useAutoSave } from '@/hooks/useAutoSave';
import { ThemeWrapper } from '../ThemeWrapper/ThemeWrapper';
import { LetterInputForm } from '../LetterInputForm/LetterInputForm';

export const PostLetterCotainer = () => {
    const [title, setTitle] = useState<string>('');
    const [letter, setLetter] = useState<string>('편지지_샘플_1');
    const [letterContent, setLetterContent] = useState<string>('');
    const [font, setFont] = useState<string>('initial');
    const [theme, setTheme] = useState<number>(1);

    const navigate = useNavigate();

    const { setValue: saveTitle } = useLocalStorage('title', '');
    const { setValue: saveLetterContent } = useLocalStorage(
        'letterContent',
        ''
    );
    const { setValue: saveFont } = useLocalStorage('font', '');
    const { setValue: saveLetter } = useLocalStorage('letter', '');

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

    useAutoSave(saveLetterData, 20000);

    return (
        <>
            <TopBar
                handleBackClick={() => {
                    navigate(-1);
                }}
                handleSuccesClick={() => {
                    saveLetterData();
                    navigate('/letter/select');
                }}
            />
            <ThemeWrapper themeId={theme}>
                <LetterInputForm
                    title={title}
                    handleChange={handleChange}
                    letterContent={letterContent}
                    setLetterContent={setLetterContent}
                    font={font}
                    letter={letter}
                    setFont={setFont}
                    setLetter={setLetter}
                    setTheme={setTheme}
                />
            </ThemeWrapper>
        </>
    );
};
