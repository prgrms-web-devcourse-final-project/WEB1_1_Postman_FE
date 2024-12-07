import React from 'react';

type KeywordListSectionProps = {
    showTitle?: boolean;
    keywords: string[];
};

export const KeywordListSection = ({
    showTitle = true,
    keywords
}: KeywordListSectionProps) => (
    <div className="flex flex-col gap-2">
        {showTitle ? (
            <h2 className="font-bold text-sample-black">내가 자주 쓴 키워드</h2>
        ) : null}
        <div className="flex flex-row flex-wrap gap-3">
            {keywords.map((keyword, index) => (
                <div key={index} className="bg-gray-100 rounded-xl px-4 py-2">
                    {keyword}
                </div>
            ))}
        </div>
    </div>
);
