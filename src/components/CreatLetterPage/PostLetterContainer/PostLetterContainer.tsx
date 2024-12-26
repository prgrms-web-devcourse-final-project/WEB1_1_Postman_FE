// PostLetterContainer.tsx
import React from 'react';
import { ThemeWrapper } from '../ThemeWrapper/ThemeWrapper';
import { LetterInputForm } from '../LetterInputForm/LetterInputForm';
import { useAutoSave, useDraftLetter } from '@/hooks';
import { SelectSlider } from '@/components/SelectItemPage/SelectSlider/SelectSlider';

interface PostLetterContainerProps {
    title: string;
    letter: string;
    letterContent: string;
    font: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setLetter: React.Dispatch<React.SetStateAction<string>>;
    setLetterContent: React.Dispatch<React.SetStateAction<string>>;
    setFont: React.Dispatch<React.SetStateAction<string>>;
}

export const PostLetterContainer = ({
    title,
    letter,
    letterContent,
    font,
    setTitle,
    setLetter,
    setLetterContent,
    setFont
}: PostLetterContainerProps) => {
    const { saveDraft } = useDraftLetter(
        title,
        letter,
        letterContent,
        font,
        setTitle,
        setLetter,
        setLetterContent,
        setFont
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    useAutoSave(saveDraft, 10000);

    return (
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
            <SelectSlider
                font={font}
                letter={letter}
                setFont={setFont}
                setLetter={setLetter}
            />
        </ThemeWrapper>
    );
};
