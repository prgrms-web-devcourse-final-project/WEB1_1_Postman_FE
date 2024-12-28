import { TextArea } from '@/components/Common/TextArea/TextArea';
import React from 'react';
import { LetterInput } from '../LetterInput/LetterInput';

type LetterProps = {
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
}: LetterProps) => {
    return (
        <div className="relative flex flex-col justify-center w-9/12 m-auto py-9">
            <LetterInput
                value={title}
                setValue={setTitle}
                placeholder={'제목을 입력해주세요'}
                maxLength={20}
                font={font}
            />
            <img src={'/to_line.f4c129e6.svg'} />

            <TextArea
                value={letterContent}
                setValue={setLetterContent}
                font={font}
            />

            {description && setDescription && (
                <LetterInput
                    value={description}
                    setValue={setDescription}
                    placeholder={'힌트를 입력해주세요'}
                    font={font}
                />
            )}
        </div>
    );
};
