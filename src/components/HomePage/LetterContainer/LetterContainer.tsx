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
                        const labelUrl =
                            'labelUrl' in letter
                                ? letter.labelUrl
                                : letter.label;

                        return (
                            <SwiperSlide key={i}>
                                <div className="h-[350px] ">
                                    <HomeBottleLetter
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
            <div className="overflow-hidden mx-[-20px] mt-[50px] h-[350px]"></div>
        </div>
    );

    return letters.length > 0 ? hasLetters : noLetters;
};
