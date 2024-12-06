import React, { useRef, useEffect, useState } from 'react';
import { Margin } from '../Margin/Margin';
import { useToastStore } from '@/hooks/useToastStore';

type TextAreaProps = {
    value: string;
    setValue: (value: string) => void;
    font?: string;
};

export const TextArea = ({ value, setValue, font }: TextAreaProps) => {
    const [lineHeight, setLineHeight] = useState<number>(2.2);
    const [lineCount, setLineCount] = useState<number>(8);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const { addToast } = useToastStore();
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let inputValue = e.target.value;

        if (textAreaRef.current) {
            const textAreaHeight = textAreaRef.current.scrollHeight;
            const textAreaLineHeight = parseInt(
                window.getComputedStyle(textAreaRef.current).lineHeight
            );

            const calculatedLinesCount = Math.floor(
                textAreaHeight / textAreaLineHeight
            );
            if (calculatedLinesCount > 40) {
                addToast('최대 40줄까지 작성이 가능합니다.', 'error');

                return;
            }

            setLineCount(calculatedLinesCount);
        }

        setValue(inputValue);
    };

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;

            const textAreaLineHeight = parseInt(
                window.getComputedStyle(textAreaRef.current).lineHeight
            );
            const textAreaHeight = textAreaRef.current.scrollHeight;
            const calculatedLinesCount = Math.floor(
                textAreaHeight / textAreaLineHeight
            );
            setLineCount(calculatedLinesCount);
        }
    }, [value]);

    const renderLineImages = () => {
        return Array.from({ length: lineCount }).map((_, index) => (
            <React.Fragment key={index}>
                <img src={'/to_line.f4c129e6.svg'} className="w-full" />
                <Margin top={28} />
            </React.Fragment>
        ));
    };

    useEffect(() => {
        const handleResize = () => {
            if (textAreaRef.current) {
                setLineHeight(
                    2.2 + (textAreaRef.current.offsetWidth - 281) * 0.0018
                );
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <textarea
                className="w-full  m-auto overflow-hidden bg-transparent border-none resize-none min-h-[413px] min-w-[281px]"
                style={{
                    fontFamily: font || 'inherit',
                    lineHeight: lineHeight
                }}
                ref={textAreaRef}
                placeholder="편지를 작성하세요..."
                value={value}
                onChange={handleInputChange}
            />

            <div className="absolute top-0 w-full mt-[30px]">
                {renderLineImages()}
            </div>
        </div>
    );
};
