import React, { KeyboardEvent, useEffect, useRef } from 'react';
import { BackButton } from '@/components/Common/BackButton/BackButton';
import { IoIosSearch } from 'react-icons/io';
import { SearchHistoryList } from '../SearchHistoryList/SearchHistoryList';
import { useSearchStore } from '@/stores/useSearchStore';

type SearchFullScreenProps = {
    isOpen: boolean;
    onClose: () => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchFullScreen = ({
    isOpen,
    onClose,
    onChange
}: SearchFullScreenProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const {
        recentSearches,
        saveSearchTerm,
        clearAllSearches,
        deleteSearchTerm,
        loadRecentSearches
    } = useSearchStore();

    useEffect(() => {
        loadRecentSearches();
    }, [loadRecentSearches]);

    const onBackClick = () => {
        onClose();
    };

    const onSearchClick = () => {
        const searchTerm = inputRef.current?.value.trim();
        if (searchTerm) {
            saveSearchTerm(searchTerm);
            onBackClick();
        }
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const searchTerm = inputRef.current?.value?.trim() || '';
        if (e.key === 'Enter' && searchTerm !== '') {
            saveSearchTerm(searchTerm);
            onBackClick();
        }
    };
    const onHistoryClick = (searchTerm: string) => {
        if (inputRef.current) {
            inputRef.current.value = searchTerm;
            saveSearchTerm(searchTerm);
            onChange({
                target: { value: searchTerm }
            } as React.ChangeEvent<HTMLInputElement>);
            onBackClick();
        }
    };
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="mx-auto min-w-[375px] max-w-[475px]">
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
                <button
                    className="text-sm text-gray-400"
                    onClick={clearAllSearches}
                >
                    전체삭제
                </button>
            </div>
            <div>
                {recentSearches.length > 0 ? (
                    recentSearches.map((history, index) => (
                        <SearchHistoryList
                            key={index}
                            place={history.place}
                            date={history.date}
                            index={index}
                            onDelete={deleteSearchTerm}
                            onClick={() => onHistoryClick(history.place)}
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
