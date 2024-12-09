import { TopBar } from '@/components/Common/TopBar/TopBar';
import { LetterInputForm } from '@/components/CreatLetterPage/LetterInputForm/LetterInputForm';
import { ThemeWrapper } from '@/components/CreatLetterPage/ThemeWrapper/ThemeWrapper';
import { useToastStore } from '@/hooks';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateMapLetterCotainer = () => {
    const { addToast } = useToastStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setTitle(inputValue);
    };

    const [title, setTitle] = useState<string>(' ');
    const [letter, setLetter] = useState<string>('1');
    const [letterContent, setLetterContent] = useState<string>(' ');
    const [font, setFont] = useState<string>('initial');

    const navigate = useNavigate();
    return (
        <>
            <TopBar
                handleBackClick={() => {
                    navigate(-1);
                }}
                handleSuccesClick={() => {
                    if (!title.trim() && !letterContent.trim()) {
                        addToast(
                            '공백을 제외한 제목과 내용을 입력해주세요',
                            'warning'
                        );
                        return;
                    }
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

export default CreateMapLetterCotainer;
