import React from 'react';

import { KeywordToggleButton } from '@/components/Common/KeywordToggleButton/KeywordToggleButton';
import { KeywordCategoryType } from '@/types/keyword';

export type KeywordListProps = {
    keywords: KeywordCategoryType[];
    onKeywordSelect: (value: string) => void;
    selectedKeywords: string[];
};

export const KeywordList = ({
    keywords,
    onKeywordSelect,
    selectedKeywords
}: KeywordListProps) => {
    return (
        <div className="px-4">
            <ol className="flex flex-wrap w-full gap-2">
                {keywords.map((keyword, categoryIdx) => (
                    <li key={categoryIdx} className="w-full">
                        <h3 className="text-xl leading-10">
                            {keyword.category}
                        </h3>
                        <ul className="flex flex-wrap gap-2">
                            {keyword.keywords.map((data, idx) => (
                                <li
                                    key={idx}
                                    onClick={() => onKeywordSelect(data)}
                                >
                                    <KeywordToggleButton
                                        keyword={data}
                                        isActive={selectedKeywords.includes(
                                            data
                                        )}
                                    />
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ol>
        </div>
    );
};
