import React, { useEffect, useState } from 'react';
import { SelectToggle } from '../SelectToggle/SelectToggle';
import { Margin } from '@/components/Common/Margin/Margin';
import { SliderMenuContainer } from '@/components/Common/SliderMenuContainer/SliderMenuContainer';
import { CreateButton } from '../CreateButton/CreateButton';
import { useNavigate } from 'react-router-dom';
import { LabelProps } from '@/types/label';
import { ItemGroup } from '../ItemGroup/ItemGroup';

type SelectItemProps = {
    isActive: boolean;
    setIsActive: (isActive: boolean) => void;
};

export const SelectItem = ({ isActive, setIsActive }: SelectItemProps) => {
    const [isLabel, setIsLabel] = useState(true);
    const [selectedLabels, setSelectedLabels] = useState<number | null>(null);
    const [selectedKeywords, setSelectedKeywords] = useState<number[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (selectedLabels && selectedKeywords.length > 0) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [selectedLabels, selectedKeywords]);

    const handleLabelSelection = (label: number) => {
        setSelectedLabels(label);
    };

    const handleKeywordSelection = (keyword: number) => {
        setSelectedKeywords((prev) =>
            prev.includes(keyword)
                ? prev.filter((k) => k !== keyword)
                : [...prev, keyword]
        );
    };

    const testLable: LabelProps[] = [
        {
            imgSrc: '라벨_샘플_01.png'
        },
        {
            imgSrc: '라벨_샘플_02.png'
        },
        {
            imgSrc: '라벨_샘플.png'
        },
        {
            imgSrc: '라벨_샘플.png'
        },
        {
            imgSrc: '라벨_샘플.png'
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
        <div className="relative">
            <SliderMenuContainer
                snapPoints={() => [80, window.innerHeight * 0.6]}
                header={
                    <CreateButton
                        isActive={isActive}
                        handleClickHandler={() => {
                            if (isActive) {
                                navigate('/letter/success');
                            }
                        }}
                    >
                        {'보내기'}
                    </CreateButton>
                }
            >
                <Margin top={15} />
                <SelectToggle isLabel={isLabel} setIsLabel={setIsLabel} />

                <ItemGroup
                    isLabel={isLabel}
                    labels={testLable}
                    onLabelSelect={handleLabelSelection}
                    selectedLabels={selectedLabels}
                    keywordProps={testKeywordListProps}
                    onKeywordSelect={handleKeywordSelection}
                    selectedKeywords={selectedKeywords}
                />

                <Margin bottom={30} />
            </SliderMenuContainer>
        </div>
    );
};
