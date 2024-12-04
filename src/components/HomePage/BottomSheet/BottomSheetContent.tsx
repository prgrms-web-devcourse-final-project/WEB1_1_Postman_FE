import { useHomeSheetStore, useSelectedKeywordStore } from '@/stores/index';
import { Margin } from '@/components/Common/Margin/Margin';
import { KeywordContainer } from './KeywordContainer';

type BottomSheetContentProps = {
    nickname: string;
};

export const BottomSheetContent = ({ nickname }: BottomSheetContentProps) => {
    const { setOpen } = useHomeSheetStore();
    const { selectedKeywords } = useSelectedKeywordStore();

    const categories = [
        {
            category: '나를 나타내는',
            keywords: [
                '일에 치인',
                '쉬고싶은',
                '배고픈',
                '꿈꾸는',
                '행복한',
                '그리워하는',
                '수다스러운',
                '현실적인',
                '행운의',
                '반짝반짝한',
                '술을 좋아하는',
                '음악 없이 못사는',
                '위로받고 싶은'
            ]
        },
        {
            category: '시간과 공간',
            keywords: [
                '입김이 나오는 날',
                '파란 하늘을 보며',
                '벚꽃 흩날림',
                '크리스마스',
                '첫눈',
                '별빛 아래',
                '비 오는 날',
                '밤 산책 하며',
                '도로 위 막히는 차 안에서'
            ]
        },
        {
            category: '일상',
            keywords: ['추억', '여행', '이별', '운동', '꿈']
        },
        {
            category: '누구에게',
            keywords: [
                '친구에게',
                '연인에게',
                '나에게',
                '소중한 사람에게',
                '가족에게',
                '최애에게'
            ]
        }
    ];

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
                onClick={() => {
                    setOpen(false);
                }}
                className="fixed left-[20px] right-[20px] bottom-[90px] h-[49px] text-white flex-center rounded-full bg-sample-blue"
            >
                완료
            </button>

            <Margin bottom={150} />
        </div>
    );
};
