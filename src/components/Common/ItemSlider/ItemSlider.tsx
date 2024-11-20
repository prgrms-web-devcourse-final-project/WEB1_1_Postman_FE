import React from 'react';
import type { CSSProperties } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// 테스트용 타입입니다.
type ItemType = 'text' | 'image';

// 테스트용 타입입니다.
type Item = {
    name: string;
    id: string;
};

type ItemSliderProps = {
    itemType: ItemType;
    itemIDList: Item[];
    width?: string;
    height?: string;
    spaceBetween?: number;
};

export const ItemSlider = ({
    itemType,
    itemIDList,
    width,
    height,
    spaceBetween = 10
}: ItemSliderProps) => {
    const slideStyle: CSSProperties = {
        width: width ? width : 'auto',
        height: height ? height : 'auto'
    };

    const getImagePath = (id: string) => {
        // 테스트 이미지 경로입니다.
        return `/${id}.png`;
    };

    const getSliderContent = (item: Item) => {
        switch (itemType) {
            case 'text':
                return (
                    <div className="p-2 h-full flex justify-center items-center">
                        {item.name}
                    </div>
                );
            case 'image':
                return (
                    <div className="h-full flex justify-center items-center">
                        <img
                            className="w-full h-full object-cover rounded"
                            src={getImagePath(item.id)}
                            alt={item.name}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Swiper
            slidesPerView={'auto'}
            spaceBetween={spaceBetween}
            freeMode={true}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
        >
            {itemIDList.map((item) => {
                return (
                    <SwiperSlide
                        style={slideStyle}
                        key={item.id}
                        className="rounded-md bg-slate-200 flex justify-center align-middle"
                    >
                        {getSliderContent(item)}
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};
