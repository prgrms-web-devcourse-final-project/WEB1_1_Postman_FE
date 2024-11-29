import { UserType } from '@/types/user';
import { useHomeSheetStore, useSelectedKeywordStore } from '@/stores/index';
import { KeywordToggleButton } from '@/components/Common/KeywordToggleButton/KeywordToggleButton';

type BottomSheetContentProps = {
    user: UserType;
};

export const BottomSheetContent = ({ user }: BottomSheetContentProps) => {
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
                <p className="">{user.nickname}님이 선택하신 키워드 입니다.</p>
                <p className="">설정하신 키워드로 편지를 추천해드릴게요.</p>
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
            <div>
                <p className="">누구와 마음을 나누고 싶나요?</p>
                <p className="">설정하신 키워드로 편지를 추천해드릴게요.</p>
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
                className="btn-base flex-center w-full h-[60px]"
            >
                완료
            </button>
        </div>
    );
};
