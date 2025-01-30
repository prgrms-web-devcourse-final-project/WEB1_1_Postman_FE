import { useState } from 'react';
import Map, { Marker } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import mapStyle from './map_style.json';
import { StyleSpecification } from 'maplibre-gl';
import { IoIosSearch } from '@react-icons/all-files/io/IoIosSearch';
import { useSelectedLetterStore } from '@/stores/useSelectedLetterStore';
import { LiaTimesSolid } from 'react-icons/lia';
import { LuMapPin } from 'react-icons/lu';
import { useSearchStore } from '@/stores/useSearchStore';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { useNearbyLetters } from '@/hooks/useNearbyLetters';
import { NearbyLettersResponseType } from '@/types/letter';
import { useLocationState } from '@/hooks/useLocationState';
import { BottleLetter } from '@/components/Common/BottleLetter/BottleLetter';

type MaplibreWithSearchProps = {
    onFocus: () => void;
    setNearbyLettersLength: (length: number) => void;
};

const ZOOM_THRESHOLD = 16;
const OFFSET = 0.00002;

const getOffsetPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI;
    const distance = OFFSET * total;
    return {
        x: distance * Math.cos(angle),
        y: distance * Math.sin(angle)
    };
};

export const MaplibreWithSearch = ({
    onFocus,
    setNearbyLettersLength
}: MaplibreWithSearchProps) => {
    const { toggleSelectedLetter, clearSelectedLetter } =
        useSelectedLetterStore();
    const { searchedLocation, clearSearchedLocation } = useSearchStore();
    const { currentLocation, direction } = useCurrentLocation();
    const [searchText, setSearchText] = useState('');

    const { viewState, setViewState } = useLocationState(
        setNearbyLettersLength
    );
    const { nearbyLetters } = useNearbyLetters(currentLocation);

    const isValidLngLat = (longitude: number, latitude: number) => {
        return (
            typeof longitude === 'number' &&
            typeof latitude === 'number' &&
            !isNaN(longitude) &&
            !isNaN(latitude)
        );
    };

    const renderMarkers = () => {
        return nearbyLetters.map(
            (letter: NearbyLettersResponseType['result'][0], index: number) => {
                if (!isValidLngLat(letter.longitude, letter.latitude)) {
                    return null;
                }

                const { x, y } = getOffsetPosition(index, nearbyLetters.length);
                const adjustedLongitude = letter.longitude + x;
                const adjustedLatitude = letter.latitude + y;

                return (
                    <Marker
                        key={letter.letterId}
                        longitude={adjustedLongitude}
                        latitude={adjustedLatitude}
                    >
                        <div
                            className="relative flex items-center justify-center w-8 h-8 transform bg-white rounded-full cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleSelectedLetter(letter);
                            }}
                        >
                            <div className="absolute w-10 h-10 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full top-1/2 left-1/2">
                                <BottleLetter
                                    Letter={{ label: letter.label }}
                                />
                            </div>
                            <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white"></div>
                        </div>
                    </Marker>
                );
            }
        );
    };

    const renderCluster = () => {
        const validLetters = nearbyLetters.filter((letter) =>
            isValidLngLat(letter.longitude, letter.latitude)
        );
        const markerCount = validLetters.length;
        if (markerCount === 0) return null;

        const averageLongitude =
            validLetters.reduce((acc, curr) => acc + curr.longitude, 0) /
            markerCount;
        const averageLatitude =
            validLetters.reduce((acc, curr) => acc + curr.latitude, 0) /
            markerCount;

        return (
            <Marker longitude={averageLongitude} latitude={averageLatitude}>
                <div className="flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-full">
                    {markerCount}
                </div>
            </Marker>
        );
    };

    return (
        <div className="relative h-full">
            <div className="absolute z-10 flex items-center p-2 space-x-2 transform -translate-x-1/2 bg-white rounded-lg shadow-md top-[1rem] left-1/2">
                <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder={'원하는 위치를 검색해보세요!'}
                    className="rounded-md outline-none w-72"
                    onFocus={onFocus}
                />
                <IoIosSearch className="w-6 h-8 cursor-pointer" />
            </div>

            {searchedLocation?.name && (
                <div className="absolute top-[5rem] w-[340px] h-[48px] left-1/2 transform -translate-x-1/2 z-10 bg-sample-gray shadow-md text-sample-black text-bold rounded-md p-2 flex items=center justify-between">
                    <LuMapPin className="ml-2" />
                    <span className="flex-1 ml-4">{searchedLocation.name}</span>
                    <LiaTimesSolid
                        className="cursor-pointer"
                        onClick={clearSearchedLocation}
                    />
                </div>
            )}
            <Map
                {...viewState}
                onMove={(evt) => setViewState(evt.viewState)}
                initialViewState={viewState}
                style={{ width: '100%', height: '100%' }}
                mapStyle={mapStyle as StyleSpecification}
                mapLib={maplibregl}
                minZoom={14}
                maxZoom={18}
                onClick={() => clearSelectedLetter()}
            >
                {currentLocation && (
                    <Marker
                        longitude={currentLocation.longitude}
                        latitude={currentLocation.latitude}
                        anchor="bottom"
                        rotation={direction || 0}
                    >
                        <span className="relative flex w-5 h-5">
                            <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-sample-marker"></span>
                            <span className="relative inline-flex items-center justify-center w-5 h-5 bg-white rounded-full">
                                <span className="relative inline-flex w-3 h-3 rounded-full bg-sample-marker" />
                            </span>
                        </span>
                    </Marker>
                )}
                {viewState.zoom >= ZOOM_THRESHOLD
                    ? renderMarkers()
                    : renderCluster()}
                {searchedLocation && (
                    <Marker
                        longitude={parseFloat(searchedLocation.lon)}
                        latitude={parseFloat(searchedLocation.lat)}
                        anchor="bottom"
                        rotation={direction || 0}
                    >
                        <div className="flex justify-center">
                            <div className="flex items-center justify-center w-10 h-10 p-2 bg-white rounded-full shadow-lg animate-bounce dark:bg-slate-800 ring-1 ring-slate-900/5 dark:ring-slate-200/20">
                                <svg
                                    className="w-6 h-6 text-sample-place"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                                </svg>
                            </div>
                        </div>
                    </Marker>
                )}
            </Map>
        </div>
    );
};
