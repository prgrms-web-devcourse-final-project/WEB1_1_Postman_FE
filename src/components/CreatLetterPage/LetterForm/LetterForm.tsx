import { TextArea } from '@/components/Common/TextArea/TextArea';
import React from 'react';

type LettetProps = {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    letterContent: string;
    setLetterContent: React.Dispatch<React.SetStateAction<string>>;
    font: string;
    letter: string;
    setFont: React.Dispatch<React.SetStateAction<string>>;
    setLetter: React.Dispatch<React.SetStateAction<string>>;
    description?: string;
    setDescription?: React.Dispatch<React.SetStateAction<string>>;
};

export const LetterForm = ({
    title,
    setTitle,
    letterContent,
    setLetterContent,
    font,
    description,
    setDescription
}: LettetProps) => {
    return (
        <div className="relative flex flex-col justify-center w-9/12 m-auto py-9">
            <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="제목을 입력해주세요"
                className={`z-10 w-full bg-transparent border-none focus:border-none focus:outline-none text-wrap ${font ? font : 'font-sans'} mt-5-`}
                maxLength={20}
            />
            <img src={'/to_line.f4c129e6.svg'} />

            <TextArea
                value={letterContent}
                setValue={setLetterContent}
                font={font}
            />

            {description && setDescription && (
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="힌트를 입력해주세요"
                    className={`z-10 w-full bg-transparent border-none focus:border-none focus:outline-none text-wrap ${font ? font : 'font-sans'}`}
                />
            )}
        </div>
    );
};
