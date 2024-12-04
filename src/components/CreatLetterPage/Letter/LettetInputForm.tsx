import { Margin } from '@/components/Common/Margin/Margin';
import { TextArea } from '@/components/Common/TextArea/TextArea';
import { SelectSlider } from '@/components/SelectItemPage/SelectSlider/SelectSlider';
import React from 'react';

type LettetProps = {
    title: string; // 제목
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 제목 변경 핸들러
    letterContent: string; // 편지 내용
    setLetterContent: React.Dispatch<React.SetStateAction<string>>; // 편지 내용 상태 변경 함수
    font: string; // 글꼴
    letter: string; // 선택된 편지지
    setFont: React.Dispatch<React.SetStateAction<string>>; // 글꼴 상태 변경 함수
    setLetter: React.Dispatch<React.SetStateAction<string>>; // 편지지 상태 변경 함수
};

export const LettetInputForm = ({
    title,
    handleChange,
    letterContent,
    setLetterContent,
    font,
    letter,
    setFont,
    setLetter
}: LettetProps) => {
    return (
        <div className="min-h-screen rounded-t-3xl bg-zinc-300">
            <Margin top={20} />
            <div className="relative flex flex-col justify-center w-9/12 m-auto py-9">
                <input
                    onChange={handleChange}
                    value={title}
                    type="text"
                    placeholder="제목을 입력해주세요"
                    className="z-10 w-full bg-transparent border-none focus:border-none focus:outline-none text-wrap"
                    style={{ fontFamily: font || 'inherit' }}
                />
                <img src={'/public/to_line.f4c129e6.svg'} />

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
            />
        </div>
    );
};
