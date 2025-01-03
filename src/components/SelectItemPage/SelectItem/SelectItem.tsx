import React, { useEffect, useState } from 'react';
import { SelectToggle } from '../SelectToggle/SelectToggle';
import { Margin } from '@/components/Common/Margin/Margin';
import { SliderMenuContainer } from '@/components/Common/SliderMenuContainer/SliderMenuContainer';
import { CreateButton } from '../CreateButton/CreateButton';
import { LabelProps } from '@/types/label';
import { ItemGroup } from '../ItemGroup/ItemGroup';
import { useDraftLetter, useLocalStorage, useToastStore } from '@/hooks';
import { useGetAllKeywords } from '@/hooks/useGetAllKeywords';
import { useParams, useLocation } from 'react-router-dom';
import { useCreateLetter } from '@/hooks/useCreateLetter';
import { usePostKeywordReplyLettter } from '@/hooks/usePostKeywordReplyLettter';
import { usePostMapReplyLetter } from '@/hooks/usePostMapReplyLetter';
import { Loading } from '@/components/Common/Loading/Loading';

type SelectItemProps = {
    isActive: boolean;
    setIsActive: (isActive: boolean) => void;
};

const testLable: LabelProps[] = [
    {
        imgSrc: '/라벨_샘플_01.png'
    },
    {
        imgSrc: '/라벨_샘플_02.png'
    }
];

export const SelectItem = ({ isActive, setIsActive }: SelectItemProps) => {
    const [isLabel, setIsLabel] = useState(true);
    const [selectedLabel, setSelectedLabel] = useState<number | null>(null);

    const [title, setTitle] = useState<string>('');
    const [letter, setLetter] = useState<string>('1');
    const [letterContent, setLetterContent] = useState<string>('');
    const [font, setFont] = useState<string>('initial');

    const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
    const { letterId } = useParams<{
        letterId: string;
    }>();
    const { pathname } = useLocation();
    const letterType = pathname.split('/')[2];

    const { mutate: mutateCreate } = useCreateLetter();
    const { mutate: mutateKeyword } = usePostKeywordReplyLettter();
    const { mutate: mutateMap } = usePostMapReplyLetter();

    const { data: keyweordData } = useGetAllKeywords();

    const { addToast } = useToastStore();

    const { loadDraft } = useDraftLetter(
        title,
        letter,
        letterContent,
        font,
        setTitle,
        setLetter,
        setLetterContent,
        setFont
    );

    useEffect(() => {
        loadDraft();
    }, []);

    useEffect(() => {
        if (selectedLabel !== null) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [selectedLabel]);

    const handleLabelSelection = (label: number) => {
        setSelectedLabel(label);
    };

    if (!keyweordData) {
        return (
            <div className="flex flex-1 w-full h-full">
                <Loading />
            </div>
        );
    }

    const handleKeywordSelection = (content: string) => {
        setSelectedKeywords((prev) =>
            prev.includes(content)
                ? prev.filter((k) => k !== content)
                : [...prev, content]
        );
    };

    const handleClick = () => {
        if (selectedLabel === null) {
            addToast('라벨을 선택해주세요.', 'error');
            return;
        }

        const letterData = {
            title: title,
            content: letterContent,
            font: font,
            paper: letter,
            keywords: selectedKeywords,
            label: testLable[selectedLabel].imgSrc
        };

        const letterMapReplyData = {
            sourceLetter: Number(letterId) || 0,
            content: letterContent,
            font: font,
            paper: letter,
            label: testLable[selectedLabel].imgSrc
        };
        const letterKeywordReplyData = {
            letterId: Number(letterId) || 0,
            content: letterContent,
            font: font,
            paper: letter,
            label: testLable[selectedLabel].imgSrc
        };

        if (letterType === 'keyword') {
            mutateKeyword(letterKeywordReplyData);
        } else if (letterType === 'map') {
            mutateMap(letterMapReplyData);
        } else {
            mutateCreate(letterData);
        }
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
                                handleClick();
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
                    keywords={keyweordData.result.categories}
                    onKeywordSelect={handleKeywordSelection}
                    selectedKeywords={selectedKeywords}
                />

                <Margin bottom={30} />
            </SliderMenuContainer>
        </div>
    );
};
