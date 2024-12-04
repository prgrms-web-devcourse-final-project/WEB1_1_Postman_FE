import { KeywordToggleButton } from '@/components/Common/KeywordToggleButton/KeywordToggleButton';
import { useSelectedKeywordStore } from '@/stores/index';

type KeywordContainerProps = {
    keywords: Array<string>;
};

export const KeywordContainer = ({ keywords }: KeywordContainerProps) => {
    const { selectedKeywords, setSelectedKeywords } = useSelectedKeywordStore();

    const toggleKeywordButton = (keyword: string) => {
        if (selectedKeywords.includes(keyword)) {
            const keywords = [...selectedKeywords].filter(
                (item) => item !== keyword
            );

            setSelectedKeywords(keywords);
        } else {
            const keywords = [...selectedKeywords, keyword];

            setSelectedKeywords(keywords);
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
