import { TopBar } from '@/components/Common/TopBar/TopBar';
import { AnimationBottle } from '@/components/SelectItemPage/AnimationBottle/AnimationBottle';
import { SelectItem } from '@/components/SelectItemPage/SelectItem/SelectItem';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SelectItemPage = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);

    const handleIsActive = useCallback((value: boolean) => {
        setIsActive(value);
    }, []);

    return (
        <div className="">
            <TopBar
                handleBackClick={() => {
                    navigate(-1);
                }}
            />

            <h2
                className={`text-2xl text-center mt-[40%] transition-opacity duration-1000 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ minHeight: '2.5rem' }}
            >
                이제 떠날 준비가 되셨나요
            </h2>

            <AnimationBottle />

            <SelectItem isActive={isActive} setIsActive={handleIsActive} />
        </div>
    );
};
