import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { NotificationBadge } from '../../Common/NotificationBadge/NotificationBadge';
import { HomeBottleLetter } from '../HomeBottleLetter';

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

type LetterContainerProps = {
    letters: Letter[];
};

export const LetterContainer = ({ letters }: LetterContainerProps) => {
    const hasLetters = (
        <div className="relative">
            <div className="absolute right-[20px] z-1">
                <NotificationBadge badgeType="basic" count={letters.length} />
            </div>
            <div className="overflow-hidden mx-[-20px] mt-[50px]">
                <Swiper
                    effect={'cards'}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="object-cover mySwiper"
                >
                    {letters.map((letter, i) => {
                        // 추천편지의 경우 label, 답장편지의 경우 labelUrl
                        const labelUrl =
                            'labelUrl' in letter
                                ? letter.labelUrl
                                : letter.label;

                        // 추천편지의 경우 keyword, 답장편지의 경우 reply
                        const LetterType =
                            'labelUrl' in letter ? 'reply' : 'keyword';

                        return (
                            <SwiperSlide key={i}>
                                <div className="h-[350px] ">
                                    <HomeBottleLetter
                                        letterType={LetterType}
                                        letterId={letter.letterId}
                                        labelUrl={labelUrl}
                                    />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );

    const noLetters = (
        <div className="relative">
            <div className="overflow-hidden mx-[-20px] mt-[50px] h-[350px] flex justify-center items-end">
                <img src="/편지없음.svg" alt="" />
            </div>
        </div>
    );

    return letters.length > 0 ? hasLetters : noLetters;
};
