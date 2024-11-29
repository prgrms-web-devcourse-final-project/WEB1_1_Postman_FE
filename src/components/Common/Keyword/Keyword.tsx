import React, { useState } from 'react';
import { KeywordToggleButton } from '../KeywordToggleButton/KeywordToggleButton';
import { KeywordProps } from '@/types/keyword';

export const Keyword = ({ content }: KeywordProps) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };
    return (
        <KeywordToggleButton
            keyword={content}
            isActive={isActive}
            onClick={handleClick}
        />
    );
};
