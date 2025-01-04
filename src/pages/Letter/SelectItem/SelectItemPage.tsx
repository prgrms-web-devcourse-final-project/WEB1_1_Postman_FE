import { TopBar } from '@/components/Common/TopBar/TopBar';
import { AnimationBottle } from '@/components/SelectItemPage/AnimationBottle/AnimationBottle';
import { SelectItem } from '@/components/SelectItemPage/SelectItem/SelectItem';
import React, { useCallback, useState } from 'react';

const SelectItemPage = () => {
    const [isActive, setIsActive] = useState(false);

    const handleIsActive = useCallback((value: boolean) => {
        setIsActive(value);
    }, []);

    return (
        <>
            <TopBar />

            <h2
                className={`text-2xl text-center mt-[25%] transition-opacity duration-1000 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ minHeight: '2.5rem' }}
            >
                이제 떠날 준비가 되셨나요
            </h2>

            <AnimationBottle />

            <SelectItem isActive={isActive} setIsActive={handleIsActive} />
        </>
    );
};

export default SelectItemPage;
