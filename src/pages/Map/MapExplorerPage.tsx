import { LetterInfoContainer } from '@/components/MapPage/LetterInfoContainer/LetterInfoContainer';
import { Maplibre } from '@/components/MapPage/Maplibre/Maplibre';
import { HiOutlinePencilAlt } from 'react-icons/hi';

export const MapExplorerPage = () => {
    const onclick = () => {
        console.log('Clicked!');
    };
    return (
        <div className="">
            <div className="relative">
                <Maplibre />
            </div>
            <button className="absolute gap-2 p-2 transform -translate-x-12 flex-center bottom-96 translate-y-7 left-1/2 btn-base w-52 rounded-2xl">
                <HiOutlinePencilAlt />
                지도 편지 작성하기
            </button>
            <div className="absolute transform -translate-x-1/2 bottom-40 left-1/2">
                <LetterInfoContainer
                    title="익명 편지"
                    keyword="가을 바람"
                    date="21.11.15"
                    clickEvent={onclick}
                />
            </div>
        </div>
    );
};
