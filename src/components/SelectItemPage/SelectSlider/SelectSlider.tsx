import { ItemSlider } from '@/components/Common/ItemSlider/ItemSlider';
import { Toggle } from '@/components/Common/Toggle/Toggle';
import React, { useMemo, useState } from 'react';
import SkyTheme from '@/asset/letter1/letter1.svg?react';
import HaertTheme from '@/asset/letter2/letter2.svg?react';
import FlowerTheme from '@/asset/letter3/letter3.svg?react';
import { ToggleVariant } from '@/components/Common/Toggle/constants';

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

    const textItems = useMemo(
        () => [
            { name: 'font-sans', id: '1', fontName: '기본 폰트' },
            { name: 'font-bagelfatone', id: '2', fontName: '베이글 폰트' },
            { name: 'font-cookierun', id: '3', fontName: '쿠키런 폰트' },
            { name: 'font-pyeongchangpeace', id: '4', fontName: '평창 폰트' },
            { name: 'font-sagak', id: '5', fontName: '필기체 폰트' },
            { name: 'font-serif', id: '6', fontName: '세리프 폰트' }
        ],
        []
    );

    const imageItems = useMemo(
        () => [
            { id: '1', src: SkyTheme, name: '이미지' },
            { id: '2', src: HaertTheme, name: '이미지' },
            { id: '3', src: FlowerTheme, name: '이미지' }
        ],
        []
    );

    return (
        <>
            <div className="flex items-center h-[120px] mb-5">
                <ItemSlider
                    itemType={isFont ? 'text' : 'image'}
                    itemIDList={isFont ? textItems : imageItems}
                    value={isFont ? font : letter}
                    setValue={isFont ? setFont : setLetter}
                    spaceBetween={isFont ? 10 : 20}
                />
            </div>
            <div className="flex flex-col items-center justify-center w-full mb-[8] ">
                <Toggle
                    isChecked={isFont}
                    onToggle={() => setIsFont(!isFont)}
                    leftLabel="편지지"
                    rightLabel="글씨체"
                    variant={ToggleVariant.Diary}
                />
            </div>
        </>
    );
};
