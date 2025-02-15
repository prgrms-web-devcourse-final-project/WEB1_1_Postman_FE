import React from 'react';

type LetterInputProps = {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;

    placeholder: string;
    maxLength?: number;
};

export const LetterInput = ({
    value,
    setValue,

    placeholder,
    maxLength = undefined
}: LetterInputProps) => {
    return (
        <>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className={
                    'z-10 w-full bg-transparent border-none focus:border-none focus:outline-none text-wrap'
                }
                maxLength={maxLength}
            />
        </>
    );
};
