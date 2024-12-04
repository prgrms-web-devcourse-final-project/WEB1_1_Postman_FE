import React, { KeyboardEvent, useEffect, useRef } from 'react';
import { BackButton } from '@/components/Common/BackButton/BackButton';
import { IoIosSearch } from 'react-icons/io';
import { SearchHistoryList } from '../SearchHistoryList/SearchHistoryList';

type SearchFullScreenProps = {
    isOpen: boolean;
    onClose: () => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    recentSearches: { place: string; date: string }[];
    setRecentSearches: React.Dispatch<
        React.SetStateAction<{ place: string; date: string }[]>
    >;
};

export const SearchFullScreen = ({
    isOpen,
    onClose,
    onChange,
    recentSearches,
    setRecentSearches
}: SearchFullScreenProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onBackClick = () => {
        onClose();
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current?.value.trim() !== '') {
            onBackClick();
        }
    };

    const onSearchClick = () => {
        if (inputRef.current?.value.trim() !== '') {
            onBackClick();
        }
    };

    const onClearAll = () => {
        localStorage.removeItem('recentSearches');
        setRecentSearches([]);
    };

    const onDelete = (index: number) => {
        const updatedSearches = [...recentSearches];
        updatedSearches.splice(index, 1);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    };

    return (
        <div className="mx-auto border min-w-[375px] max-w-[475px] h-[1vh]">
            <div className="flex items-center pl-3 pr-4 justify-between w-full border-b h-12">
                <BackButton onClick={onBackClick} />
                <input
                    ref={inputRef}
                    type="text"
                    name="query"
                    title="숨길 장소를 입력해주세요."
                    placeholder="숨길 장소를 입력해주세요."
                    className="flex-1 outline-none"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                />
                <IoIosSearch
                    className="w-6 h-12 cursor-pointer"
                    onClick={onSearchClick}
                />
            </div>
            <div className="flex justify-between text-gray-400 py-2 px-4">
                <span>최근 검색어</span>
                <button className="text-sm  text-gray-400" onClick={onClearAll}>
                    전체삭제
                </button>
            </div>
            <div className="py-2 px-4">
                {recentSearches.length > 0 ? (
                    recentSearches.map((history, index) => (
                        <SearchHistoryList
                            key={index}
                            place={history.place}
                            date={history.date}
                            index={index}
                            onDelete={onDelete}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 flex-center text-sm mt-16">
                        최근 검색어 내역이 없습니다.
                    </p>
                )}
            </div>
        </div>
    );
};
