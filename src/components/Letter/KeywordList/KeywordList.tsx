import React from 'react';
import { KeywordProps } from '@/types/keyword';
import { Keyword } from '@/components/Common/Keyword/Keyword';

export type KeywordListProps = {
    title: string;
    subTitle: string;
    keywordGroup: KeywordProps[];
};

export const KeywordList = ({
    title,
    subTitle,
    keywordGroup
}: KeywordListProps) => {
    return (
        <div className="px-4 ">
            <h3 className="text-xl leading-10 ">{title}</h3>
            <h4 className="text-[16px] leading-10">{subTitle}</h4>
            <ul className="flex flex-wrap w-full gap-2">
                {keywordGroup.map((keyword, idx) => (
                    <li key={idx}>
                        <Keyword content={keyword.content} />
                    </li>
                ))}
            </ul>
        </div>
    );
};
