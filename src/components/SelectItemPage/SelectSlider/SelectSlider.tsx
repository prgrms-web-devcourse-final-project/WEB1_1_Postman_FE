import { Margin } from '@/components/Common/Margin/Margin';
import { ItemSlider } from '@/components/Common/ItemSlider/ItemSlider';
import { Toggle } from '@/components/Common/Toggle/Toggle';
import React, { useState } from 'react';

type SelectSliderProps = {
    font: string;
    setFont: (font: string) => void;
    letter: string;
    setLetter: (letter: string) => void;
};

export const SelectSlider = ({
    font,
    setFont,
    letter,
    setLetter
}: SelectSliderProps) => {
    const [isFont, setIsFont] = useState(false);

    const textItems = [
        { name: 'font-sans', id: '1', fontName: '기본 폰트' },
        { name: 'font-bagelfatone', id: '2', fontName: '베이글 폰트' },
        { name: 'font-cookierun', id: '3', fontName: '쿠키런 폰트' },
        { name: 'font-pyeongchangpeace', id: '4', fontName: '평창 폰트' },
        { name: 'font-sagak', id: '5', fontName: '필기체 폰트' },
        { name: 'font-serif', id: '6', fontName: '세리프 폰트' }
    ];

    const imageItems = [
        { id: '1', src: 'letter1/letter1', name: '이미지' },
        { id: '2', src: 'letter2/letter2', name: '이미지' },
        { id: '3', src: 'letter3/letter3', name: '이미지' }
    ];

    return (
        <div className="z-10">
            <div className="flex items-center h-[120px]">
                <ItemSlider
                    itemType={isFont ? 'text' : 'image'}
                    itemIDList={isFont ? textItems : imageItems}
                    width="90px"
                    height="130px"
                    value={isFont ? font : letter}
                    setValue={isFont ? setFont : setLetter}
                    spaceBetween={isFont ? 10 : 20}
                />
            </div>
            <Margin bottom={20} />
            <div className="flex flex-col items-center justify-center w-full ">
                <Toggle
                    isChecked={isFont}
                    onToggle={() => setIsFont(!isFont)}
                    leftLabel="편지지"
                    rightLabel="글씨체"
                />
                <Margin bottom={30} />
            </div>
        </div>
    );
};
