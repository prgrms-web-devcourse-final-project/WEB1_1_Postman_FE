import React, { useState, useEffect } from 'react';
import { LetterInfoContainer } from '@/components/MapPage/LetterInfoContainer/LetterInfoContainer';
import { NavigateContainer } from '@/components/MapPage/NavigateContainer/NavigateContainer';
import { MaplibreWithSearch } from '@/components/MapPage/Maplibre/MaplibreWithSearch';
import { PiPencilSimpleLine } from 'react-icons/pi';
import { useSelectedLetterStore } from '@/stores/useSelectedLetterStore';
import { NavLink } from 'react-router-dom';
import { SearchFullScreen } from '@/components/MapPage/SearchFullScreen/SearchFullScreen';
import useNominatimSearch from '@/hooks/useNominatimSearch';
import { useSearchStore } from '@/stores/useSearchStore';
import { formatDate } from '@/util/formatDate';
import { calculateDaysLeft } from '@/util/calculateDaysLeft';
import { formatDistance } from '@/util/formatDistance';

const MapExplorerPage = () => {
    const { searchedLocation } = useSearchStore();
    const selectedLetter = useSelectedLetterStore(
        (state) => state.selectedLetter
    );

    const [nearbyLettersLength, setNearbyLettersLength] = useState(0);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const { error, data, isLoading } = useNominatimSearch(query);

    const [daysLeft, setDaysLeft] = useState(0);

    useEffect(() => {
        if (selectedLetter) {
            const days = calculateDaysLeft(selectedLetter.createdAt);
            setDaysLeft(days);
        }
    }, [selectedLetter]);

    const formattedDistance = selectedLetter
        ? formatDistance(selectedLetter.distance)
        : '0.0';

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

    const CreateBtnStyle = `text-sample-blue absolute p-2 transform translate-x-64 flex-center bottom-[5rem] translate-y-7 bg-white w-10 rounded-2xl`;

    return (
        <div className="h-full">
            <div className="relative h-full">
                {!isSearchFocused && (
                    <MaplibreWithSearch
                        onFocus={onFocus}
                        setNearbyLettersLength={setNearbyLettersLength}
                    />
                )}
                {isOpen && (
                    <div className="absolute top-0 w-full">
                        <SearchFullScreen
                            isOpen={isOpen}
                            onClose={onClose}
                            onChange={onChange}
                        />
                        {error && <p>검색 오류: {error.message}</p>}
                        {!isLoading && !error && data?.length === 0 && (
                            <p className="mt-40 flex-center">
                                검색 결과가 없습니다.
                            </p>
                        )}
                    </div>
                )}
            </div>
            <div className="absolute transform -translate-x-1/2 bottom-[6rem] left-1/2">
                {!isSearchFocused && (
                    <>
                        {selectedLetter ? (
                            <>
                                {searchedLocation ? (
                                    <NavLink
                                        to={`/letter/map/:${searchedLocation.lat}/:${searchedLocation.lon}/create`}
                                        className={CreateBtnStyle}
                                    >
                                        <PiPencilSimpleLine />
                                    </NavLink>
                                ) : (
                                    <NavLink
                                        to={'/letter/create'}
                                        className={`cursor-not-allowed transform translate-x-72 mb-32 ${CreateBtnStyle}`}
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <PiPencilSimpleLine />
                                    </NavLink>
                                )}
                                <LetterInfoContainer
                                    letterId={selectedLetter.letterId}
                                    title={selectedLetter.title}
                                    distance={`${formattedDistance}`}
                                    date={formatDate(selectedLetter.createdAt)}
                                    daysLeft={daysLeft}
                                    lat={selectedLetter.latitude}
                                    lot={selectedLetter.longitude}
                                    label={selectedLetter.label}
                                />
                            </>
                        ) : (
                            <>
                                {searchedLocation ? (
                                    <NavLink
                                        to={`/letter/map/:${searchedLocation.lat}/:${searchedLocation.lon}/create`}
                                        className={CreateBtnStyle}
                                    >
                                        <PiPencilSimpleLine />
                                    </NavLink>
                                ) : (
                                    <NavLink
                                        to={'/letter/create'}
                                        className={`cursor-not-allowed ${CreateBtnStyle}`}
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <PiPencilSimpleLine />
                                    </NavLink>
                                )}
                                <NavigateContainer
                                    count={nearbyLettersLength}
                                />
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default MapExplorerPage;
