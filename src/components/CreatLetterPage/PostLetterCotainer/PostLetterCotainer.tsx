import React from 'react';
import { useState } from 'react';
import { useToastStore } from '@/hooks/useToastStore';
import { TopBar } from '@/components/Common/TopBar/TopBar';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useAutoSave } from '@/hooks/useAutoSave';
import { LettetInputForm } from '../LettetInputForm/LettetInputForm';

export const PostLetterCotainer = () => {
    const [title, setTitle] = useState<string>('');
    const [letter, setLetter] = useState<string>('편지지_샘플_1');
    const [letterContent, setLetterContent] = useState<string>('');
    const [font, setFont] = useState<string>('initial');

    const { addToast } = useToastStore();
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
        if (inputValue.length > 100) {
            addToast('제목은 100자 이상 쓸 수 없습니다.', 'warning');
        } else {
            setTitle(inputValue);
        }
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
                handelSuccesClick={() => {
                    saveLetterData();
                    navigate('/letter/select');
                }}
            />
            <LettetInputForm
                title={title}
                handleChange={handleChange}
                letterContent={letterContent}
                setLetterContent={setLetterContent}
                font={font}
                letter={letter}
                setFont={setFont}
                setLetter={setLetter}
            />
        </>
    );
};
