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
    const { data } = useKeywordLetterDetail({
        letterId: String(letter.letterId)
    });

    const letterKeywords =
        data.keywords.length > 9 ? data.keywords.slice(0, 9) : data.keywords;

    return (
        <>
            <div className="flex flex-wrap gap-2 absolute w-[50%] pl-6">
                {letterKeywords.map((keyword, i) => {
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
        </>
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

    return letters.length > 1 ? hasLetters : noLetters;
};
