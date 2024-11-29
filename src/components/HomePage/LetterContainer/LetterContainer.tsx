import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { BottleLetter } from '../../Common/BottleLetter/BottleLetter';
import { NotificationBadge } from '../../Common/NotificationBadge/NotificationBadge';

export const LetterContainer = () => {
    const letters = [
        {
            letterId: 1,
            createdDate: '날짜',
            font: '글씨체',
            keywords: ['공감', '행복', '후련함'],
            content: '편지 내용',
            paper: '이미지 url',
            label: '라벨_샘플.png'
        },
        {
            letterId: 1,
            createdDate: '날짜',
            font: '글씨체',
            keywords: ['공감', '행복', '후련함'],
            content: '편지 내용',
            paper: '이미지 url',
            label: '라벨_샘플.png'
        },
        {
            letterId: 1,
            createdDate: '날짜',
            font: '글씨체',
            keywords: ['공감', '행복', '후련함'],
            content: '편지 내용',
            paper: '이미지 url',
            label: '라벨_샘플.png'
        }
    ];

    return (
        <div className="relative">
            <div className="absolute right-[20px]">
                <NotificationBadge badgeType="basic" count={letters.length} />
            </div>
            <div className="overflow-hidden mx-[-20px] mt-[50px]">
                {/* <div className="overflow-hidden mx-[-20px] ml-[-70px] translate-x-[50px]"> */}
                <Swiper
                    effect={'cards'}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="mySwiper object-cover"
                >
                    {letters.map((letter, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <div className="h-[350px] ">
                                    <BottleLetter Letter={letter} />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
};
