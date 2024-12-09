import { Margin } from '@/components/Common/Margin/Margin';
import { SliderMenuContainer } from '@/components/Common/SliderMenuContainer/SliderMenuContainer';
import { TopBar } from '@/components/Common/TopBar/TopBar';
import { AnimationBottle } from '@/components/SelectItemPage/AnimationBottle/AnimationBottle';
import { CreateButton } from '@/components/SelectItemPage/CreateButton/CreateButton';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LabelProps } from '@/types/label';
import { LabelList } from '@/components/SelectItemPage/LabelList/LabelList';
import { useCreateMapLetter } from '@/hooks/useCreateMapLetter';
import { useLocalStorage } from '@/hooks';

const testLable: LabelProps[] = [
    {
        imgSrc: '/라벨_샘플_01.png'
    },
    {
        imgSrc: '/라벨_샘플_02.png'
    }
];

export const MapSelectItemPage = () => {
    const navigate = useNavigate();

    // 로컬스토리지에서 데이터 가져오기
    const { storedValue: title } = useLocalStorage('maptitle', '');
    const { storedValue: content } = useLocalStorage('mapcontent', '');
    const { storedValue: description } = useLocalStorage('mapdescription', '');
    const { storedValue: font } = useLocalStorage('mapfont', 'initial');
    const { storedValue: letter } = useLocalStorage('mapletter', '1');
    const { storedValue: latitude } = useLocalStorage('maplat', '0');
    const { storedValue: longitude } = useLocalStorage('maplot', '0');

    // latitude와 longitude를 숫자로 변환
    const latitudeValue = Number(latitude);
    const longitudeValue = Number(longitude);

    const [selectedLabel, setSelectedLabel] = useState<number | null>(null);
    const [isActive, setIsActive] = useState(false);

    const { mutate } = useCreateMapLetter();

    const handleClick = () => {
        console.log('보내기 버튼 클릭됨!');
        if (selectedLabel === null) {
            return;
        }
        mutate({
            title,
            content,
            description,
            latitude: latitudeValue,
            longitude: longitudeValue,
            font,
            paper: letter,
            label: testLable[selectedLabel].imgSrc
        });
    };

    useEffect(() => {
        if (selectedLabel !== null) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [selectedLabel]);

    const onLabelSelect = (label: number) => {
        setSelectedLabel(label);
    };

    return (
        <div className="">
            <TopBar
                handleBackClick={() => {
                    navigate(-1);
                }}
            />

            <h2
                className={`text-2xl text-center mt-[25%] transition-opacity duration-1000 ${
                    isActive === true ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ minHeight: '2.5rem' }}
            >
                이제 떠날 준비가 되셨나요
            </h2>

            <AnimationBottle />

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
                    <LabelList
                        labels={testLable} // 라벨 리스트
                        onLabelSelect={onLabelSelect} // 라벨 선택 시 호출될 함수
                        selectedLabel={selectedLabel} // 선택된 라벨 정보 전달
                    />

                    <Margin bottom={30} />
                </SliderMenuContainer>
            </div>
        </div>
    );
};
