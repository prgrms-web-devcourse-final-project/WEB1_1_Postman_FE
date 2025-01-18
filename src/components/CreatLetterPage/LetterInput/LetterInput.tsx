import React from 'react';

type LetterInputProps = {
    value: string;
    handleChangeTitle?: (title: string) => void;
    placeholder?: string;
    maxLength?: number;
};

export const LetterInput = ({
    value,
    handleChangeTitle,
    placeholder,
    maxLength = undefined
}: LetterInputProps) => {
    return (
        <>
            <input
                value={value}
                onChange={(e) => handleChangeTitle?.(e.target.value)}
                placeholder={placeholder}
                className={
                    'z-10 w-full bg-transparent border-none focus:border-none focus:outline-none text-wrap'
                }
                maxLength={maxLength}
            />
        </>
    );
};
