import { Margin } from '@/components/Common/Margin/Margin';
import { SliderMenuContainer } from '@/components/Common/SliderMenuContainer/SliderMenuContainer';
import React, { useState } from 'react';
import { LabelProps } from '@/types/lable';
import { KeywordList } from '../KeywordList/KeywordList';
import { LableList } from '../LableList/LableList';

export const SelectItem = () => {
    const [isLabel, setIsLabel] = useState(true);

    const testLable: LabelProps[] = [
        {
            imgSrc: 'public/라벨_샘플.png'
        },
        {
            imgSrc: 'public/라벨_샘플.png'
        },
        {
            imgSrc: 'public/라벨_샘플.png'
        },
        {
            imgSrc: 'public/라벨_샘플.png'
        },
        {
            imgSrc: 'public/라벨_샘플.png'
        }
    ];

    const testKeywordListProps = {
        title: 'Frontend Technologies',
        subTitle: 'Trending Tools',
        keywordGroup: [
            { content: 'React' },
            { content: 'TypeScript' },
            { content: 'Tailwind CSS' },
            { content: 'Next.js' },
            { content: 'React' },
            { content: 'TypeScript' },
            { content: 'Tailwind CSS' },
            { content: 'Next.js' }
        ]
    };
    return (
        <SliderMenuContainer>
            <Margin top={15} />
            <div className="relative flex w-full overflow-hidden text-xl align-middle h-[50px] ">
                <div
                    className="absolute bottom-0 w-1/2 h-[2px] transition-transform duration-500 ease-in-out bg-gray-500"
                    style={{
                        transform: `translateX(${isLabel ? '0%' : '100%'})`
                    }}
                ></div>
                <div
                    className="flex items-center justify-center flex-1 h-full cursor-pointer"
                    onClick={() => setIsLabel(true)}
                >
                    <span>라벨</span>
                </div>
                <div
                    className="flex items-center justify-center flex-1 h-full cursor-pointer"
                    onClick={() => setIsLabel(false)}
                >
                    <span>키워드</span>
                </div>
            </div>

            {isLabel ? (
                <LableList LableList={testLable} />
            ) : (
                <div>
                    <div>
                        <KeywordList
                            title={testKeywordListProps.title}
                            subTitle={testKeywordListProps.subTitle}
                            keywordGroup={testKeywordListProps.keywordGroup}
                        />
                    </div>
                </div>
            )}

            <Margin bottom={90} />
        </SliderMenuContainer>
    );
};
