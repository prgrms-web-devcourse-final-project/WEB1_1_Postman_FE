import { Margin } from '@/components/Common/Margin/Margin';
import { useRef, useState } from 'react';
import { SelectSlider } from '../SelectSlier/SelectSlider';
import React from 'react';
import { useToastStore } from '@/hooks/useToastStore';

export const PostLetterForm = () => {
    const [title, setTitle] = useState('');
    const [letter, setLetter] = useState<string>('편지지_샘플_1');
    const [font, setFont] = useState<string>('');
    const [lineCount, setLineCount] = useState<number>(9);
    const { addToast } = useToastStore();
    const divRef = useRef<HTMLDivElement>(null);

    const handleInput = () => {
        if (divRef.current) {
            const textAreaHeight = divRef.current.scrollHeight;
            const computedStyle = window.getComputedStyle(divRef.current);
            const lineHeight = parseInt(computedStyle.lineHeight, 10);
            console.log(lineHeight);

            const linesCount = Math.floor(textAreaHeight / lineHeight);
            setLineCount(linesCount);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (inputValue.length > 100) {
            addToast('제목은 100자 이상 쓸 수 없습니다.', 'warning');
        } else {
            setTitle(inputValue);
        }
    };

    const renderLineImages = () => {
        return Array.from({ length: lineCount }).map((_, index) => (
            <React.Fragment key={index}>
                <img src={'/public/to_line.f4c129e6.svg'} className="w-full" />
                <Margin top={30} />
            </React.Fragment>
        ));
    };

    return (
        <div className="min-h-screen z-10rounded-t-3xl bg-zinc-300">
            <Margin top={10} />
            <div className="relative flex flex-col justify-center w-9/12 m-auto py-14">
                <input
                    onChange={handleChange}
                    value={title}
                    type="text"
                    placeholder="제목을 입력해주세요"
                    className="z-10 w-full px-2 bg-transparent border-none focus:border-none focus:outline-none text-wrap"
                />
                <img src={'/public/to_line.f4c129e6.svg'} />

                <div className="relative z-10">
                    <div
                        ref={divRef}
                        contentEditable="true"
                        className="z-10 leading-[250%] min-h-[300px]"
                        onInput={handleInput}
                    ></div>
                    <div className="absolute top-0 w-full mt-[30px]">
                        {renderLineImages()}
                    </div>
                </div>
            </div>
            <SelectSlider
                font={font}
                letter={letter}
                setFont={setFont}
                setLetter={setLetter}
            />
        </div>
    );
};
