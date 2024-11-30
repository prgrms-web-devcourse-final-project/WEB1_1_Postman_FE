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
    value: string;
    setValue: (value: string) => void; // value를 변경할 수 있는 setValue 함수
};

export const ItemSlider = ({
    itemType,
    itemIDList,
    width,
    height,
    spaceBetween = 10,
    value,
    setValue
}: ItemSliderProps) => {
    const slideStyle: CSSProperties = {
        width: 'auto',
        height: 'auto'
    };

    const getImagePath = (id: string) => {
        // 테스트 이미지 경로입니다.
        return `/${id}.png`;
    };

    const getSliderContent = (item: Item) => {
        switch (itemType) {
            case 'text':
                return (
                    <div
                        className="flex items-center justify-center h-full p-2 cursor-pointer"
                        onClick={() => {
                            setValue(item.name);
                            console.log(item.name);
                        }} // 아이템 클릭 시 setValue 호출
                    >
                        {item.name}
                    </div>
                );
            case 'image':
                return (
                    <div
                        className="flex items-center justify-center h-full cursor-pointer"
                        onClick={() => {
                            setValue(item.id);
                            console.log(item.id);
                        }} // 아이템 클릭 시 setValue 호출
                    >
                        <img
                            className="object-cover rounded"
                            src={getImagePath(item.id)}
                            alt={item.name}
                            style={{ width: width, height: height }}
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
                        className={`flex justify-center align-middle rounded-md bg-slate-200 ${
                            item.id === value ? 'bg-blue-200' : '' // 선택된 아이템 배경 색 변경
                        }`}
                    >
                        {getSliderContent(item)}
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};
