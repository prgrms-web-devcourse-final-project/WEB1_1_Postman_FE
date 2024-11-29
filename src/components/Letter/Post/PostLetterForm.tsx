import { ItemSlider } from '@/components/Common/ItemSlider/ItemSlider';
import { Margin } from '@/components/Common/Margin/Margin';
import { SliderMenuContainer } from '@/components/Common/SliderMenuContainer/SliderMenuContainer';
import { TextArea } from '@/components/Common/TextArea/TextArea';
import { Toggle } from '@/components/Common/Toggle/Toggle';
import { useState } from 'react';

export const PostLetterForm = () => {
    const [title, setTtile] = useState('');
    const [content, setContent] = useState('');
    const [isFont, setIsFont] = useState(true);
    const [letter, setLetter] = useState('');
    const [font, setFont] = useState('');

    const textItems = [
        { name: 'cursive', id: '1' },
        { name: 'fantasy', id: '2' },
        { name: 'initial', id: '3' },
        { name: 'monospace', id: '4' },
        { name: '테스트 글꼴', id: '5' },
        { name: '테스트 글꼴', id: '6' },
        { name: '테스트 글꼴', id: '7' },
        { name: '테스트 글꼴', id: '9' },
        { name: '테스트 글꼴', id: '10' },
        { name: '테스트 글꼴', id: '11' },
        { name: '테스트 글꼴', id: '12' }
    ];

    const imageItems = [
        { id: '편지지_샘플_1', name: '이미지' },
        { id: '편지지_샘플_2', name: '이미지' },
        { id: '편지지_샘플_3', name: '이미지' },
        { id: '편지지_샘플_4', name: '이미지' },
        { id: '편지지_샘플_5', name: '이미지' }
    ];

    return (
        <SliderMenuContainer>
            <Margin top={18} />
            <div>
                <div className="relative flex justify-center">
                    <input
                        onChange={(e) => setTtile(e.target.value)}
                        value={title}
                        type="text"
                        placeholder="제목을 입력해주세요"
                        className="absolute mt-[35%] w-9/12 bg-transparent  px-2 focus:border-none focus:outline-none border-none "
                    />
                    <TextArea value={content} setValue={setContent} />
                </div>

                <img
                    src={'/public/편지지_샘플_1.png'}
                    className="w-full h-full rounded-lg "
                    alt="샘플 편지지"
                />

                <div className="flex flex-col items-center justify-center aling bottom-9 ">
                    <Margin bottom={14} />
                    {isFont ? (
                        <ItemSlider
                            itemType="text"
                            itemIDList={textItems}
                            value={font}
                            setValue={setFont}
                        />
                    ) : (
                        <ItemSlider
                            itemType="image"
                            itemIDList={imageItems}
                            width="77px"
                            height="99px"
                            value={letter}
                            setValue={setLetter}
                        />
                    )}
                    <Margin bottom={14} />
                    <Toggle
                        isChecked={isFont}
                        onToggle={() => setIsFont(!isFont)}
                    />
                    <Margin bottom={14} />
                </div>
            </div>
        </SliderMenuContainer>
    );
};
