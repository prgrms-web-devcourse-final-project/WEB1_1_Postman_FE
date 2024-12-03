import React from 'react';
import { Margin } from '@/components/Common/Margin/Margin';
import { useState } from 'react';
import { SelectSlider } from '../SelectSlier/SelectSlider';
import { useToastStore } from '@/hooks/useToastStore';
import { TextArea } from '@/components/Common/TextArea/TextArea';
import { TopBar } from '@/components/Common/TopBar/TopBar';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export const PostLetterForm = () => {
    const [title, setTitle] = useState<string>('');
    const [letter, setLetter] = useState<string>('편지지_샘플_1');
    const [letterContent, setLetterContent] = useState<string>('');
    const [font, setFont] = useState<string>('initial');

    const { addToast } = useToastStore();
    const navigate = useNavigate();

    const { setValue: saveTitle } = useLocalStorage('title', '');
    const { setValue: saveLetterContent } = useLocalStorage(
        'letterContent',
        ''
    );
    const { setValue: saveFont } = useLocalStorage('font', '');
    const { setValue: saveLetter } = useLocalStorage('letter', '');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (inputValue.length > 100) {
            addToast('제목은 100자 이상 쓸 수 없습니다.', 'warning');
        } else {
            setTitle(inputValue);
        }
    };

    return (
        <>
            <TopBar
                handleBackClick={() => {
                    navigate(-1);
                }}
                handelSuccesClick={() => {
                    saveTitle(title);
                    saveLetterContent(letterContent);
                    saveFont(font);
                    saveLetter(letter);
                    navigate('/letter/select');
                }}
            />
            <div className="min-h-screen rounded-t-3xl bg-zinc-300">
                <Margin top={20} />
                <div className="relative flex flex-col justify-center w-9/12 m-auto py-14">
                    <input
                        onChange={handleChange}
                        value={title}
                        type="text"
                        placeholder="제목을 입력해주세요"
                        className="z-10 w-full bg-transparent border-none focus:border-none focus:outline-none text-wrap"
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
        </>
    );
};
