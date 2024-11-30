import { Margin } from '@/components/Common/Margin/Margin';
import { TopBar } from '@/components/Common/TopBar/TopBar';
import { AnimationBottle } from '@/components/Letter/AnimationBottle/AnimationBottle';
import { SelectItem } from '@/components/Letter/SelectItem/SelectItem';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SelectItemPage = () => {
    const navigate = useNavigate();

    return (
        <div className="w-[375px] max-w-[475px] h-screen max-h-[812px]">
            <TopBar
                handleBackClick={() => {
                    navigate(-1);
                }}
            />
            <Margin top={100} />
            <AnimationBottle />

            <SelectItem />
        </div>
    );
};
