import React, { useState } from 'react';
import type { CSSProperties } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

type ItemType = 'text' | 'image';

type Item = {
    name: string;
    id: string;
    src?: string;
};

type ItemSliderProps = {
    itemType: ItemType;
    itemIDList: Item[];
    width?: string;
    height?: string;
    spaceBetween?: number;
    value: string;
    setValue: (value: string) => void; // value를 변경할 수 있는 setValue 함수
    setTheme: (themeId: number) => void;
};

export const ItemSlider = ({
    itemType,
    itemIDList,
    width,
    height,
    spaceBetween = 10,
    value,
    setValue,
    setTheme
}: ItemSliderProps) => {
    const [clickedItemId, setClickedItemId] = useState<string | null>(null);

    const slideStyle: CSSProperties = {
        width: 'auto',
        height: 'auto'
    };

    const getImagePath = (id: string) => {
        return `/${id}.svg`;
    };

    const getSliderContent = (item: Item) => {
        switch (itemType) {
            case 'text':
                return (
                    <div
                        className="flex items-center justify-center h-full p-2 cursor-pointer"
                        onClick={() => {
                            setClickedItemId(item.id);
                            setValue(item.name);
                        }}
                    >
                        {item.name}
                    </div>
                );
            case 'image':
                return (
                    <div
                        className={`flex items-center justify-center h-full cursor-pointer `}
                        onClick={() => {
                            setClickedItemId(item.id);
                            setValue(item.id);
                            setTheme(Number(item.id));
                        }}
                    >
                        <img
                            className="object-cover min-w-full rounded min-h-[120px]"
                            src={getImagePath(item.src!)}
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
                        className={`flex justify-center items-center rounded-md bg-slate-200 ${
                            item.id === value ? 'bg-blue-200' : ''
                        }`}
                    >
                        {getSliderContent(item)}
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};
