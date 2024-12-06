import { Margin } from '@/components/Common/Margin/Margin';
import { ItemSlider } from '@/components/Common/ItemSlider/ItemSlider';
import { Toggle } from '@/components/Common/Toggle/Toggle';
import React, { useState } from 'react';

type SelectSliderProps = {
    font: string;
    setFont: (font: string) => void;
    letter: string;
    setLetter: (letter: string) => void;
    setTheme: (themeId: number) => void;
};

export const SelectSlider = ({
    font,
    setFont,
    letter,
    setLetter,
    setTheme
}: SelectSliderProps) => {
    const [isFont, setIsFont] = useState(false);

    const textItems = [
        { name: 'cursive', id: '1' },
        { name: 'fantasy', id: '2' },
        { name: 'initial', id: '3' },
        { name: 'monospace', id: '4' },
        { name: 'cursive', id: '5' },
        { name: 'fantasy', id: '6' },
        { name: 'initial', id: '7' },
        { name: 'monospace', id: '8' }
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
                    setTheme={setTheme}
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
