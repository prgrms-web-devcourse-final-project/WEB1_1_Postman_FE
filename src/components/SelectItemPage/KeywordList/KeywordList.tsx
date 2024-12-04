import React from 'react';
import { KeywordProps } from '@/types/keyword';
import { KeywordToggleButton } from '@/components/Common/KeywordToggleButton/KeywordToggleButton';

export type KeywordListProps = {
    title: string;
    subTitle: string;
    keywordGroup: KeywordProps[];
    selectedKeywords: number | null;
    onKeywordSelect: (index: number) => void;
};

export const KeywordList = ({
    title,
    subTitle,
    keywordGroup,
    selectedKeywords,
    onKeywordSelect
}: KeywordListProps) => {
    return (
        <div className="px-4 ">
            <h3 className="text-xl leading-10 ">{title}</h3>
            <h4 className="text-[16px] leading-10">{subTitle}</h4>
            <ul className="flex flex-wrap w-full gap-2">
                {keywordGroup.map((keyword, idx) => (
                    <li
                        key={idx}
                        onClick={() => {
                            onKeywordSelect(idx);
                        }}
                    >
                        <KeywordToggleButton
                            keyword={keyword.content}
                            isActive={selectedKeywords === idx}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
