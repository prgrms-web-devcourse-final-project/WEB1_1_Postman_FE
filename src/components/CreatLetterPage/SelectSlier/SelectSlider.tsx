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
    const [isFont, setIsFont] = useState(true);

    const textItems = [
        { name: 'cursive', id: '1' },
        { name: 'fantasy', id: '2' },
        { name: 'initial', id: '3' },
        { name: 'monospace', id: '4' }
    ];

    const imageItems = [
        { id: '편지지_샘플_1', name: '이미지' },
        { id: '편지지_샘플_2', name: '이미지' },
        { id: '편지지_샘플_3', name: '이미지' },
        { id: '편지지_샘플_4', name: '이미지' },
        { id: '편지지_샘플_5', name: '이미지' }
    ];

    return (
        <div className="flex flex-col items-center justify-center w-full ">
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
                leftLabel="글씨체"
                rightLabel="편지지"
            />
            <Margin bottom={30} />
        </div>
    );
};
