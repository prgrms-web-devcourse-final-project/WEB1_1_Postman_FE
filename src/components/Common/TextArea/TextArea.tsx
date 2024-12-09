import React, { useRef, useEffect, useState } from 'react';
import { Margin } from '../Margin/Margin';
import { useToastStore } from '@/hooks/useToastStore';
import { clsx } from 'clsx';

type TextAreaProps = {
    value: string;
    setValue?: (value: string) => void;
    font?: string;
    isReadonly?: boolean;
};

export const TextArea = ({
    value,
    setValue,
    font,
    isReadonly
}: TextAreaProps) => {
    const [lineHeight, setLineHeight] = useState<number>(2.2);
    const [lineCount, setLineCount] = useState<number>(8);
    const [textAreaHeight, setTextAreaHeight] = useState<number>(0);
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
            if (calculatedLinesCount > 30) {
                addToast('최대 30줄까지 작성이 가능합니다.', 'error');
                return;
            }

            setLineCount(calculatedLinesCount);
            setTextAreaHeight(textAreaHeight);
        }

        if (setValue) {
            setValue(inputValue);
        }
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
            setTextAreaHeight(textAreaHeight);
        }
    }, [value]);

    const renderLineImages = () => {
        const lineImages = Array.from({ length: lineCount }).map((_, index) => (
            <React.Fragment key={index}>
                <img
                    src={'/to_line.f4c129e6.svg'}
                    className="w-full"
                    style={{
                        objectFit: 'contain'
                    }}
                />
                <Margin top={28} />
            </React.Fragment>
        ));

        return <>{lineImages}</>;
    };

    useEffect(() => {
        const handleResize = () => {
            if (textAreaRef.current) {
                setLineHeight(
                    2.2 + (textAreaRef.current.offsetWidth - 281) * 0.0018
                );
                setTextAreaHeight(textAreaRef.current.scrollHeight);
                console.log(textAreaRef.current.scrollHeight);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative">
            <textarea
                className={clsx(
                    `w-full  m-auto overflow-hidden bg-transparent border-none resize-none min-h-[413px] min-w-[281px] focus:outline-none`,
                    font ? font : 'font-sans'
                )}
                style={{
                    lineHeight: lineHeight
                }}
                ref={textAreaRef}
                placeholder="편지를 작성하세요."
                value={value}
                onChange={handleInputChange}
                readOnly={isReadonly}
            />

            <div
                className="absolute top-0 w-full mt-[30px] overflow-hidden"
                style={{ maxHeight: textAreaHeight }}
            >
                {renderLineImages()}
            </div>
        </div>
    );
};
