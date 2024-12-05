import React, { useEffect, useState } from 'react';
import { SelectToggle } from '../SelectToggle/SelectToggle';
import { Margin } from '@/components/Common/Margin/Margin';
import { SliderMenuContainer } from '@/components/Common/SliderMenuContainer/SliderMenuContainer';
import { CreateButton } from '../CreateButton/CreateButton';
import { useNavigate } from 'react-router-dom';
import { LabelProps } from '@/types/label';
import { ItemGroup } from '../ItemGroup/ItemGroup';
import { useCreateLetter } from '@/hooks/useCreateLetter';
import { useLocalStorage } from '@/hooks';

type SelectItemProps = {
    isActive: boolean;
    setIsActive: (isActive: boolean) => void;
};

export const SelectItem = ({ isActive, setIsActive }: SelectItemProps) => {
    const [isLabel, setIsLabel] = useState(true);
    const [selectedLabel, setSelectedLabel] = useState<number | null>(null);
    const [selectedKeywords, setSelectedKeywords] = useState<number[]>([]);

    const navigate = useNavigate();

    const { mutate } = useCreateLetter();

    const { storedValue: title } = useLocalStorage<string>('title', '');
    const { storedValue: letter } = useLocalStorage<string>('letter', '');
    const { storedValue: letterContent } = useLocalStorage<string>(
        'letterContent',
        ''
    );
    const { storedValue: font } = useLocalStorage<string>('font', '');

    const keywords = selectedKeywords
        .map((x) => testKeywordListProps.keywordGroup[x]?.content)
        .filter((content): content is string => content !== undefined);

    const handdleClick = () => {
        if (selectedLabel && selectedKeywords) {
            mutate({
                title: title,
                content: letterContent,
                font: font,
                paper: letter,
                keywords: keywords,
                label: testLable[selectedLabel].imgSrc
            });
        }
    };

    useEffect(() => {
        if (selectedLabel && selectedKeywords.length > 0) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [selectedLabel, selectedKeywords]);

    const handleLabelSelection = (label: number) => {
        setSelectedLabel(label);
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
            { content: 'jquey' },
            { content: 'docker' },
            { content: 'xocde' },
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
                                handdleClick();
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
                    selectedLabel={selectedLabel}
                    keywordProps={testKeywordListProps}
                    onKeywordSelect={handleKeywordSelection}
                    selectedKeywords={selectedKeywords}
                />

                <Margin bottom={30} />
            </SliderMenuContainer>
        </div>
    );
};
