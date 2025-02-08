import { Swiper, SwiperSlide } from 'swiper/react';
// import { EffectCards } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { WaveContainer } from '@/components/Common/WaveContainer/WaveContainer';
import { HomeBottle } from '../HomeBottle';
import { useKeywordLetterDetail } from '@/hooks/useGetKeywordLetterDetail';
import { Pagination } from 'swiper/modules';

type RecommendLetter = {
    letterId: number;
    title: string;
    label: string;
};

type ReplyLetter = {
    type: 'MAP' | 'KEYWORD';
    labelUrl: string;
    letterId: number;
};

type Letter = RecommendLetter | ReplyLetter;

type LetterSlideProps = {
    letter: Letter;
};

type LetterContainerProps = {
    letters: Letter[];
};

const LetterSlide = ({ letter }: LetterSlideProps) => {
    // 추천편지의 경우 label, 답장편지의 경우 labelUrl
    const labelUrl = 'labelUrl' in letter ? letter.labelUrl : letter.label;

    // 추천편지의 경우 keyword, 답장편지의 경우 reply
    const LetterType = 'labelUrl' in letter ? 'REPLY_LETTER' : 'LETTER';

    // 편지 아이디로 편지 키워드 가져오기
    const { data, isError } = useKeywordLetterDetail({
        letterId: String(letter.letterId)
    });

    // 에러거나 data가 undefined일때 빈 배열
    const letterKeywords =
        isError || !data
            ? []
            : data.keywords.length > 9
              ? data.keywords.slice(0, 9)
              : data.keywords;

    return (
        <div className="relative">
            {isError && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center bg-orange-50 text-orange-800 border border-orange-200 rounded-md z-[2] px-6 py-5 shadow-sm space-y-1 min-w-[330px]">
                    <p className="font-medium">조회가 불가능한 편지입니다.</p>
                    <p className="text-sm text-orange-700 text-center">
                        작성자가 삭제한 편지나, 보관함에서 삭제 처리가 완료된
                        편지는 열람이 불가능합니다.
                    </p>
                </div>
            )}
            {/* 클릭 방지 오버레이 레이어 */}
            {isError && <div className="absolute inset-0 z-[1]" />}
            <div className="flex flex-wrap gap-2 absolute w-[50%] pl-6">
                {letterKeywords.length > 0 &&
                    letterKeywords.map((keyword, i) => {
                        return (
                            <div
                                key={i}
                                className="bg-white border-solid rounded-full px-3 py-1 text-sample-black font-light z-[1]"
                            >
                                #
                                {keyword.length > 12
                                    ? keyword.slice(0, 12) + '...'
                                    : keyword}
                            </div>
                        );
                    })}
            </div>
            <div className="h-[380px] overflow-visible">
                <HomeBottle
                    letterType={LetterType}
                    letterId={letter.letterId}
                    labelUrl={labelUrl}
                />
            </div>
        </div>
    );
};

export const LetterContainer = ({ letters }: LetterContainerProps) => {
    const hasLetters = (
        <div className="relative pb-10 mx-[-20px] overflow-hidden">
            <WaveContainer />

            <div className="mt-[50px]">
                <Swiper
                    pagination={true}
                    modules={[Pagination]}
                    grabCursor={true}
                    className="mySwiper"
                >
                    {letters.map((letter) => (
                        <SwiperSlide key={letter.letterId}>
                            <LetterSlide letter={letter} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );

    const noLetters = (
        <div className="relative pb-10 mx-[-20px] overflow-hidden">
            <WaveContainer />
            <div className="h-[380px] mt-[50px]"></div>
        </div>
    );

    return letters.length > 0 ? hasLetters : noLetters;
};
