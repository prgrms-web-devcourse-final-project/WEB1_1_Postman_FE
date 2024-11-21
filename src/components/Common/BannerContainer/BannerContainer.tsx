import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Banner } from '@/components/Common/Banner/Banner';
import { ArchivedlBanner } from '@/components/Common/Banner/ArchivedlBanner';
import { LabelCollectionsBanner } from '@/components/Common/Banner/LabelCollectionsBanner';

type bannersType = {
    banner: React.ComponentType;
    color: 'bg-primary';
};
export const BannerContainer = () => {
    const banners: bannersType[] = [
        { banner: ArchivedlBanner, color: 'bg-primary' },
        { banner: LabelCollectionsBanner, color: 'bg-primary' }
    ];

    return (
        <div className="bg-lightpurple">
            <Swiper
                pagination={true}
                modules={[Pagination, Autoplay]}
                className="w-full px-4 py-12  mx-auto max-w-default"
                spaceBetween={40}
                slidesPerView={1}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false
                }}
                breakpoints={{
                    768: {
                        slidesPerView: 1
                    }
                }}
            >
                {banners.map(({ banner, color }, i) => (
                    <SwiperSlide
                        key={i}
                        className="transition-transform md:hover:scale-105"
                    >
                        <Banner color={color}>
                            {React.createElement(banner)}
                        </Banner>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
