import { BackButton } from '@/components/Common/BackButton/BackButton';
import { IoIosSearch } from 'react-icons/io';
import { SearchHistoryList } from '../SearchHistoryList/SearchHistoryList';

const searchHistory = [
    { place: '서울시 용산구 한강대로', date: '12.03.' },
    { place: '서울시 강남구 테헤란로', date: '12.03.' },
    { place: '서울시 송파구 올림픽로', date: '12.03.' }
];

type SearchFullScreenProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const SearchFullScreen = ({
    isOpen,
    onClose
}: SearchFullScreenProps) => {
    const onBackClick = () => {
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="mx-auto border min-w-[375px] max-w-[475px] h-[1vh]">
            <div className="flex items-center pl-3 pr-4 justify-between w-full border-b h-12">
                <BackButton onClick={onBackClick} />
                <input
                    type="text"
                    name="query"
                    title="숨길 장소를 입력해주세요."
                    placeholder="숨길 장소를 입력해주세요."
                    className="flex-1 outline-none"
                ></input>
                <IoIosSearch className="w-6 h-12" />
            </div>
            <div className="flex justify-between text-gray-400 py-2 px-4">
                <span>최근 검색어</span>
                <span>전체삭제</span>
            </div>
            <div className="py-2 px-4">
                {searchHistory.map((history, index) => (
                    <SearchHistoryList
                        key={index}
                        place={history.place}
                        date={history.date}
                    />
                ))}
            </div>
        </div>
    );
};
