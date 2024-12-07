import React from 'react';
import { LabelList } from '../LabelList/LabelList';
import { KeywordList } from '../KeywordList/KeywordList';
import { LabelProps } from '@/types/label';
import { KeywordCategoryType } from '@/types/keyword';

type ItemGroupProps = {
    isLabel: boolean;
    labels: LabelProps[];
    onLabelSelect: (label: number) => void;
    selectedLabel: number | null;
    keywords: KeywordCategoryType[];
    onKeywordSelect: (keyword: string) => void;
    selectedKeywords: string[];
};

export const ItemGroup: React.FC<ItemGroupProps> = ({
    isLabel,
    labels,
    onLabelSelect,
    selectedLabel,
    keywords,
    onKeywordSelect,
    selectedKeywords
}) => {
    return isLabel ? (
        <LabelList
            labels={labels}
            onLabelSelect={onLabelSelect}
            selectedLabel={selectedLabel}
        />
    ) : (
        <KeywordList
            keywords={keywords}
            onKeywordSelect={onKeywordSelect}
            selectedKeywords={selectedKeywords}
        />
    );
};
