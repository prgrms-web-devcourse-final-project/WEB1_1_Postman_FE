import { Margin } from '@/components/Common/Margin/Margin';
import { TextArea } from '@/components/Common/TextArea/TextArea';
import { SelectSlider } from '@/components/SelectItemPage/SelectSlider/SelectSlider';
import React from 'react';

type LettetProps = {
    title: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    letterContent: string;
    setLetterContent: React.Dispatch<React.SetStateAction<string>>;
    font: string;
    letter: string;
    setFont: React.Dispatch<React.SetStateAction<string>>;
    setLetter: React.Dispatch<React.SetStateAction<string>>;
    setTheme: (theme: number) => void;
};

export const LetterInputForm = ({
    title,
    handleChange,
    letterContent,
    setLetterContent,
    font,
    letter,
    setFont,
    setLetter,
    setTheme
}: LettetProps) => {
    return (
        <>
            <Margin top={20} />
            <div className="relative flex flex-col justify-center w-9/12 m-auto py-9">
                <input
                    onChange={handleChange}
                    value={title}
                    type="text"
                    placeholder="제목을 입력해주세요"
                    className={`z-10 w-full bg-transparent border-none focus:border-none focus:outline-none text-wrap ${font ? font : 'font-sans'}`}
                    maxLength={20}
                />
                <img src={'/to_line.f4c129e6.svg'} />

                <div className="relative z-10">
                    <TextArea
                        value={letterContent}
                        setValue={setLetterContent}
                        font={font}
                    />
                </div>
            </div>
            <SelectSlider
                font={font}
                letter={letter}
                setFont={setFont}
                setLetter={setLetter}
                setTheme={setTheme}
            />
        </>
    );
};
