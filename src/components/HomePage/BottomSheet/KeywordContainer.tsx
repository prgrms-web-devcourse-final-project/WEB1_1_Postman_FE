import { KeywordToggleButton } from '@/components/Common/KeywordToggleButton/KeywordToggleButton';
import { useCreateUserKeywords } from '@/hooks/useCreateUserKeywords';
import { useSelectedKeywordStore } from '@/stores/index';
// import { useEffect } from 'react';

type KeywordContainerProps = {
    keywords: Array<string>;
};

export const KeywordContainer = ({ keywords }: KeywordContainerProps) => {
    const { selectedKeywords, setSelectedKeywords } = useSelectedKeywordStore();
    const { mutate: createUserKeywords } = useCreateUserKeywords();

    const toggleKeywordButton = (keyword: string) => {
        if (selectedKeywords.includes(keyword)) {
            const updatedKeywords = [...selectedKeywords].filter(
                (item) => item !== keyword
            );

            setSelectedKeywords(updatedKeywords);
            createUserKeywords(updatedKeywords);
        } else {
            const updatedKeywords = [...selectedKeywords, keyword];

            setSelectedKeywords(updatedKeywords);
            createUserKeywords(updatedKeywords);
        }
    };

    return (
        <div className="mt-3 flex flex-wrap gap-2">
            {keywords.map((keyword, i) => {
                return (
                    <KeywordToggleButton
                        key={i}
                        keyword={keyword}
                        isActive={selectedKeywords.includes(keyword)}
                        onClick={() => {
                            toggleKeywordButton(keyword);
                        }}
                    ></KeywordToggleButton>
                );
            })}
        </div>
    );
};
