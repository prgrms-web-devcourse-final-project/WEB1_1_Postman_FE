import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// 테스트 아이템 타입입니다.
type Item = {
    name: string;
    id: string;
};

type ItemSliderProps = {
    itemIDList: Item[];
};

export const ItemSlider = ({ itemIDList }: ItemSliderProps) => {
    return (
        <Swiper
            slidesPerView={'auto'}
            spaceBetween={10}
            freeMode={true}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
        >
            {itemIDList.map((item) => {
                return (
                    <SwiperSlide
                        style={{ width: 'auto' }}
                        className="w-auto"
                        key={item.id}
                    >
                        <div className="rounded-md bg-slate-400 p-1">
                            {item.name}
                        </div>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};
