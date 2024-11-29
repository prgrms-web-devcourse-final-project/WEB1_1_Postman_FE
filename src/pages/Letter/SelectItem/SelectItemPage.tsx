import { Bottle } from '@/components/Common/BottleLetter/Bottle/Bottle';
import { TopBar } from '@/components/Common/TopBar/TopBar';
import { SelectItem } from '@/components/Letter/SelectItem/SelectItem';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SelectItemPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <TopBar
                handleBackClick={() => {
                    navigate(-1);
                }}
            />
            <Bottle />
            <SelectItem />
        </div>
    );
};
