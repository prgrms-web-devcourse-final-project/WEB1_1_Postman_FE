// ItemSlider.tsx
import React from 'react';
import type { CSSProperties } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

type TextItem = {
    name: string;
    id: string;
    fontName: string;
};

type ImageItem = {
    id: string;
    src: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    name: string;
};

type Item = TextItem | ImageItem;

type ItemSliderProps = {
    itemType: 'text' | 'image';
    itemIDList: Item[];
    width?: string;
    height?: string;
    spaceBetween?: number;
    value: string;
    setValue: (value: string) => void;
};
const ItemSlider = ({
    itemIDList,

    spaceBetween = 10,
    value,
    setValue
}: ItemSliderProps) => {
    const slideStyle: CSSProperties = {
        width: 'auto',
        height: 'auto'
    };

    const getSliderContent = (item: Item) => {
        if ('fontName' in item) {
            return (
                <div
                    className={`flex items-center justify-center h-full p-2 cursor-pointer ${item.name} bg-white rounded-lg`}
                    onClick={() => setValue(item.name)}
                >
                    {item.fontName}
                </div>
            );
        } else {
            const SvgComponent = item.src;
            return (
                <div
                    className="w-[90px] h-[130px] flex items-center justify-center cursor-pointer"
                    onClick={() => setValue(item.id)}
                >
                    <SvgComponent
                        preserveAspectRatio="xMidYMid slice"
                        className="w-full h-full"
                        viewBox="0 0 500 1080"
                    />
                </div>
            );
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
            {itemIDList.map((item) => (
                <SwiperSlide
                    style={slideStyle}
                    key={item.id}
                    className={`flex justify-center items-center rounded-md bg-slate-200 border-2 ${
                        item.id === value ||
                        ('fontName' in item && item.name === value)
                            ? 'border-[rgb(34,184,239)]'
                            : 'border-transparent'
                    }`}
                >
                    {getSliderContent(item)}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ItemSlider;
