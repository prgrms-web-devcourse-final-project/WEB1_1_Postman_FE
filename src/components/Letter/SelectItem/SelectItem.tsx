import { Margin } from '@/components/Common/Margin/Margin';
import { SliderMenuContainer } from '@/components/Common/SliderMenuContainer/SliderMenuContainer';
import React, { useEffect, useState } from 'react';
import { LabelProps } from '@/types/label';
import { KeywordList } from '../KeywordList/KeywordList';
import { LabelList } from '../LabelList/LabelList';
import { CreateButton } from '../CreateButton/CreateButton';
import { useNavigate } from 'react-router-dom';

type SelectItemProps = {
    isActive: boolean;
    setIsActive: (isActive: boolean) => void;
};

export const SelectItem = ({ isActive, setIsActive }: SelectItemProps) => {
    const [isLabel, setIsLabel] = useState(true);
    const [selectedLabels, setSelectedLabels] = useState<number[]>([]);
    const [selectedKeywords, setSelectedKeywords] = useState<number[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (selectedLabels.length > 0 && selectedKeywords.length > 0) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [selectedLabels, selectedKeywords]);

    // 라벨 선택 핸들러
    const handleLabelSelection = (label: number) => {
        setSelectedLabels((prev) =>
            prev.includes(label)
                ? prev.filter((l) => l !== label)
                : [...prev, label]
        );
    };

    // 키워드 선택 핸들러
    const handleKeywordSelection = (keyword: number) => {
        setSelectedKeywords((prev) =>
            prev.includes(keyword)
                ? prev.filter((k) => k !== keyword)
                : [...prev, keyword]
        );
    };

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
        <SliderMenuContainer
            snapPoints={() => [
                window.innerHeight * 0.05,
                window.innerHeight * 0.6
            ]}
        >
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
                <LabelList
                    labels={testLable}
                    onLabelSelect={handleLabelSelection}
                    selectedLabels={selectedLabels}
                />
            ) : (
                <div>
                    <KeywordList
                        title={testKeywordListProps.title}
                        subTitle={testKeywordListProps.subTitle}
                        keywordGroup={testKeywordListProps.keywordGroup}
                        onKeywordSelect={handleKeywordSelection}
                        selectedKeywords={selectedKeywords}
                    />
                </div>
            )}
            <Margin bottom={30} />
            <CreateButton
                isActive={isActive}
                handleClickHandler={() => {
                    if (isActive) {
                        navigate('/letter/success');
                    }
                }}
            />
            <Margin bottom={30} />
        </SliderMenuContainer>
    );
};
