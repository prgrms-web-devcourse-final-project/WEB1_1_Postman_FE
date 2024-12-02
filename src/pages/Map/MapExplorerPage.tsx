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
            <button className="flex-center bottom-96 translate-y-7 absolute left-1/2 transform -translate-x-12 btn-base gap-2 w-52 p-2 rounded-2xl">
                <HiOutlinePencilAlt />
                지도 편지 작성하기
            </button>
            <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2">
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
