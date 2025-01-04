import React, { KeyboardEvent, useEffect, useRef } from 'react';
import { BackButton } from '@/components/Common/BackButton/BackButton';
import { IoIosSearch } from 'react-icons/io';
import { SearchHistoryList } from '../SearchHistoryList/SearchHistoryList';
import { useSearchStore } from '@/stores/useSearchStore';
import { RelatedSearchTermsList } from '../RelatedSearchTermsList/RelatedSearchTermsList';

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
        loadRecentSearches,
        relatedSearchTerms,
        clearSearchedLocation
    } = useSearchStore();

    useEffect(() => {
        loadRecentSearches();
    }, [loadRecentSearches]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const onSearchClick = () => {
        const searchTerm = inputRef.current?.value.trim();
        if (searchTerm) {
            saveSearchTerm(searchTerm);
            onClose();
        }
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearchClick();
        }
    };

    const onTermClick = (searchTerm: string) => {
        if (inputRef.current) {
            inputRef.current.value = searchTerm;
            saveSearchTerm(searchTerm);
            onChange({
                target: { value: searchTerm }
            } as React.ChangeEvent<HTMLInputElement>);
            onClose();
        }
    };

    const isInputNotEmpty = inputRef.current?.value.trim() !== '';

    if (!isOpen) return null;

    return (
        <div className="mx-auto min-w-[375px] max-w-[475px]">
            <div className="flex items-center justify-between w-full h-12 pl-3 pr-4 border-b">
                <BackButton
                    onClick={() => {
                        clearSearchedLocation();
                        onClose();
                    }}
                />
                <input
                    ref={inputRef}
                    type="text"
                    name="query"
                    title="원하는 위치를 검색해보세요!"
                    placeholder="원하는 위치를 검색해보세요!"
                    className="flex-1 outline-none"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                />
                <IoIosSearch
                    className="w-6 h-12 cursor-pointer"
                    onClick={onSearchClick}
                />
            </div>

            {!isInputNotEmpty && (
                <div className="flex justify-between px-4 py-2 text-gray-400">
                    <span>최근 검색어</span>
                    <button
                        className="text-sm text-gray-400"
                        onClick={clearAllSearches}
                    >
                        전체삭제
                    </button>
                </div>
            )}

            <div>
                {isInputNotEmpty ? (
                    relatedSearchTerms.map((related, index) => (
                        <RelatedSearchTermsList
                            key={index}
                            place={related}
                            onClick={() => onTermClick(related)}
                        />
                    ))
                ) : recentSearches.length > 0 ? (
                    recentSearches.map((history, index) => (
                        <SearchHistoryList
                            key={index}
                            place={history.place}
                            date={history.date}
                            index={index}
                            onDelete={deleteSearchTerm}
                            onClick={() => onTermClick(history.place)}
                        />
                    ))
                ) : (
                    <p className="mt-16 text-sm text-gray-500 flex-center">
                        최근 검색어 내역이 없습니다.
                    </p>
                )}
            </div>
        </div>
    );
};
