import { useHomeSheetStore, useSelectedKeywordStore } from '@/stores/index';
import { KeywordToggleButton } from '@/components/Common/KeywordToggleButton/KeywordToggleButton';
import { Margin } from '@/components/Common/Margin/Margin';

type BottomSheetContentProps = {
    nickname: string;
};

export const BottomSheetContent = ({ nickname }: BottomSheetContentProps) => {
    const { setOpen } = useHomeSheetStore();
    const { selectedKeywords, setSelectedKeywords } = useSelectedKeywordStore();

    const allKeywords = [
        '키워드1',
        '키워드2',
        '키워드3',
        '키워드4',
        '키워드5',
        '키워드6',
        '키워드7',
        '키워드8',
        '키워드9',
        '키워드10',
        '키워드11',
        '키워드12',
        '키워드13',
        '키워드14'
    ];

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
        <div className="flex flex-col gap-5 p-5">
            <div>
                <p className="text-title3 text-sample-black">
                    {nickname}님이 선택하신{' '}
                    <span className="text-sample-blue">키워드</span>
                    입니다.
                </p>
                <p className="text-body2 text-sample-textgray">
                    설정하신 키워드로 편지를 추천해드릴게요.
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                    {selectedKeywords.map((keyword, i) => {
                        return (
                            <KeywordToggleButton
                                key={i}
                                keyword={keyword}
                                isActive
                                onClick={() => {
                                    toggleKeywordButton(keyword);
                                }}
                            ></KeywordToggleButton>
                        );
                    })}
                </div>
            </div>

            <Margin top={10} />

            <div>
                <p className="text-title3 text-sample-black">
                    누구와 마음을 나누고 싶나요?
                </p>
                <p className="text-body2 text-sample-textgray">
                    설정하신 키워드로 편지를 추천해드릴게요.
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                    {allKeywords.map((keyword, i) => {
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
            </div>
            <button
                onClick={() => {
                    setOpen(false);
                }}
                className="w-full h-[49px] text-white flex-center rounded-full bg-[#22B8EF]"
            >
                완료
            </button>
        </div>
    );
};
