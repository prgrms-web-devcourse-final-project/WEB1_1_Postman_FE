import clsx from 'clsx';
import React, { useMemo } from 'react';

type LetterInputProps = {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    font: string;
    placeholder: string;
    maxLength?: number;
};

export const LetterInput = ({
    value,
    setValue,
    font,
    placeholder,
    maxLength = undefined
}: LetterInputProps) => {
    const inputClass = useMemo(
        () =>
            clsx(
                `z-10 w-full bg-transparent border-none focus:border-none focus:outline-none text-wrap`,
                font || 'font-sans'
            ),
        [font]
    );

    return (
        <>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className={inputClass}
                maxLength={maxLength}
            />
        </>
    );
};
