import { useSelectedKeywordStore } from '@/stores/index';
import { Margin } from '@/components/Common/Margin/Margin';
import { KeywordContainer } from './KeywordContainer';
import { useGetAllKeywords } from '@/hooks/useGetAllKeywords';
import { useGetUserKeywords } from '@/hooks/useGetUserKeywords';
import { useEffect } from 'react';
import { Loading } from '@/components/Common/Loading/Loading';

type BottomSheetContentProps = {
    nickname: string | undefined;
    onClick: () => void;
};

export const BottomSheetContent = ({
    nickname,
    onClick
}: BottomSheetContentProps) => {
    const { selectedKeywords, setSelectedKeywords } = useSelectedKeywordStore();

    if (nickname === undefined) nickname = '';

    const {
        data: allKeywordsData,
        isLoading: isAllKeywordsLoading,
        isError: isAllKeywordsError
    } = useGetAllKeywords();

    const {
        data: userKeywordsData,
        isLoading: isUserKeywordsLoading,
        isError: isUserKeywordsError
    } = useGetUserKeywords();

    // 사용자 키워드 데이터를 스토어에 초기화
    useEffect(() => {
        if (userKeywordsData?.result.keywords) {
            setSelectedKeywords(userKeywordsData.result.keywords);
        }
    }, [userKeywordsData, setSelectedKeywords]);

    if (isAllKeywordsLoading || isUserKeywordsLoading) {
        return (
            <div className="flex flex-1 w-full h-full">
                <Loading />
            </div>
        );
    }

    if (isAllKeywordsError || isUserKeywordsError) {
        return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;
    }

    // 모든 키워드
    const categories = allKeywordsData?.result.categories || [];

    return (
        <div className="flex flex-col gap-5 p-5">
            {/* 그라데이션 */}
            <div className="absolute bottom-[76px] left-0 w-full h-[120px] bg-gradient-to-t from-white to-transparent pointer-events-none"></div>

            <div>
                <p className="text-title3 text-sample-black">
                    {nickname}님이 선택하신{' '}
                    <span className="text-sample-blue">키워드</span>
                    입니다.
                </p>
                <p className="text-body2 text-sample-textgray">
                    설정하신 키워드로 편지를 추천해드릴게요.
                </p>
                <KeywordContainer keywords={selectedKeywords} />
            </div>

            <div>
                <p className="text-title3 text-sample-black">
                    누구와 마음을 나누고 싶나요?
                </p>

                <p className="text-body2 text-sample-textgray">
                    설정하신 키워드로 편지를 추천해드릴게요.
                </p>

                {categories.map((category, index) => {
                    return (
                        <div key={index}>
                            <Margin top={20} />

                            <p className="text-body2 text-sample-blue">
                                {category.category}
                            </p>

                            <KeywordContainer keywords={category.keywords} />
                        </div>
                    );
                })}
            </div>

            <button
                onClick={onClick}
                className="fixed left-[20px] right-[20px] bottom-[90px] h-[49px] text-white flex-center rounded-full bg-sample-blue"
            >
                완료
            </button>

            <Margin bottom={150} />
        </div>
    );
};
