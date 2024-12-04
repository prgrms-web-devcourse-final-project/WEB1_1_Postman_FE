import React, { useState, useEffect } from 'react';
import { LetterInfoContainer } from '@/components/MapPage/LetterInfoContainer/LetterInfoContainer';
import { NavigateContainer } from '@/components/MapPage/NavigateContainer/NavigateContainer';
import { MaplibreWithSearch } from '@/components/MapPage/Maplibre/MaplibreWithSearch';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { useSelectedLetterStore } from '@/stores/useSelectedLetterStore';
import { NavLink } from 'react-router-dom';
import { SearchFullScreen } from '@/components/MapPage/SearchFullScreen/SearchFullScreen';
import useNominatimSearch from '@/hooks/useNominatimSearch';

export const MapExplorerPage = () => {
    const selectedLetter = useSelectedLetterStore(
        (state) => state.selectedLetter
    );
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const { error, data, isLoading, recentSearches, setRecentSearches } =
        useNominatimSearch(query);
    const [searchedLocation, setSearchedLocation] = useState<{
        lat: string;
        lon: string;
        name: string;
    } | null>(null);

    const onFocus = () => {
        setIsSearchFocused(true);
        setIsOpen(true);
    };

    const onClose = () => {
        setIsOpen(false);
        setIsSearchFocused(false);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    useEffect(() => {
        if (data && data.length > 0) {
            const location = {
                lat: data[0].lat,
                lon: data[0].lon,
                name: data[0].name
            };
            setSearchedLocation(location);
            console.log(location);
        }
    }, [data]);

    return (
        <div>
            <div className="relative">
                {!isSearchFocused && (
                    <MaplibreWithSearch
                        onFocus={onFocus}
                        searchedLocation={searchedLocation}
                    />
                )}
                {isOpen && (
                    <div className="absolute top-0 w-full">
                        <SearchFullScreen
                            isOpen={isOpen}
                            onClose={onClose}
                            onChange={onChange}
                            recentSearches={recentSearches}
                            setRecentSearches={setRecentSearches}
                        />
                        {error && <p>검색 오류: {error.message}</p>}
                        {!isLoading && !error && data?.length === 0 && (
                            <p>검색 결과가 없습니다.</p>
                        )}
                    </div>
                )}
            </div>
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                {!isSearchFocused && (
                    <>
                        {selectedLetter ? (
                            <>
                                <NavLink
                                    to={'/letter/create'}
                                    className="flex-center bottom-60 translate-y-7 absolute left-1/2 transform -translate-x-12 btn-base gap-2 w-52 p-2 rounded-2xl"
                                >
                                    <HiOutlinePencilAlt />
                                    지도 편지 작성하기
                                </NavLink>
                                <LetterInfoContainer
                                    id={123}
                                    title="익명 편지"
                                    distance={400}
                                    date="21.11.15"
                                    daysLeft={21}
                                />
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to={'/letter/create'}
                                    className="flex-center bottom-24 translate-y-7 absolute left-1/2 transform -translate-x-12 btn-base gap-2 w-52 p-2 rounded-2xl"
                                >
                                    <HiOutlinePencilAlt />
                                    지도 편지 작성하기
                                </NavLink>
                                <NavigateContainer count={5} />
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
