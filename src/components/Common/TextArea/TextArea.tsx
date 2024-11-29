import React, { useRef, useEffect } from 'react';

type TextAreaProps = {
    value: string;
    setValue: (value: string) => void;
    font?: string;
};

export const TextArea = ({ value, setValue, font }: TextAreaProps) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let inputValue = e.target.value;

        if (textAreaRef.current) {
            const textAreaHeight = textAreaRef.current.scrollHeight;
            const textAreaLineHeight = parseInt(
                window.getComputedStyle(textAreaRef.current).lineHeight
            );

            const linesCount = Math.floor(textAreaHeight / textAreaLineHeight);

            if (linesCount > 8) {
                inputValue = value;
            }
        }

        const lines = inputValue.split('\n');
        if (lines.length <= 8) {
            setValue(inputValue);
        }
    };

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [value]);
    return (
        <textarea
            className="absolute w-9/12 px-2 bg-transparent border-none resize-none mt-[42%] leading-[260%] overflow-hidden h-auto"
            style={{ fontFamily: font || 'inherit' }}
            ref={textAreaRef}
            placeholder="편지를 작성하세요..."
            value={value}
            onChange={handleInputChange}
        />
    );
};
