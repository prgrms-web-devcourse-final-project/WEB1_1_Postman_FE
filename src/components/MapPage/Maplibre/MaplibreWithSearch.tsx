import { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import mapStyle from './map_style.json';
import { StyleSpecification } from 'maplibre-gl';
import { IoIosSearch } from 'react-icons/io';
import { useSelectedLetterStore } from '@/stores/useSelectedLetterStore';
import { LiaTimesSolid } from 'react-icons/lia';
import { LuMapPin } from 'react-icons/lu';
import { useSearchStore } from '@/stores/useSearchStore';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { useNearbyLetters } from '@/hooks/useNearbyLetters';

type Letter = {
    id: number;
    longitude: number;
    latitude: number;
    title: string;
    keyword: string;
    date: string;
};
type MaplibreWithSearchProps = {
    onFocus: () => void;
};
const sampleLetters: Letter[] = [
    {
        id: 1,
        longitude: 127.01,
        latitude: 37.51,
        title: '첫 번째 편지',
        keyword: '가을 바람',
        date: '21.11.15'
    },
    {
        id: 2,
        longitude: 127.02,
        latitude: 37.52,
        title: '두 번째 편지',
        keyword: '단풍',
        date: '21.11.20'
    },
    {
        id: 3,
        longitude: 126.99,
        latitude: 37.49,
        title: '세 번째 편지',
        keyword: '바람',
        date: '21.11.25'
    }
];

export const MaplibreWithSearch = ({ onFocus }: MaplibreWithSearchProps) => {
    const { toggleSelectedLetter, clearSelectedLetter } =
        useSelectedLetterStore();
    const { searchedLocation, clearSearchedLocation } = useSearchStore();
    const { currentLocation, direction } = useCurrentLocation();
    const [searchText, setSearchText] = useState('');

    const [viewState, setViewState] = useState({
        longitude: 127.0,
        latitude: 37.5,
        zoom: 11
    });

    const nearbyLetters = useNearbyLetters(currentLocation, sampleLetters);
    useEffect(() => {
        if (searchedLocation) {
            setViewState({
                longitude: parseFloat(searchedLocation.lon),
                latitude: parseFloat(searchedLocation.lat),
                zoom: 16
            });
        } else {
            if (currentLocation) {
                setViewState((prev) => ({
                    ...prev,
                    longitude: currentLocation.longitude,
                    latitude: currentLocation.latitude,
                    zoom: 15
                }));
            }
        }
    }, [searchedLocation, currentLocation]);

    return (
        <div className="relative h-[812px] w-full">
            <div className="absolute z-10 flex items-center p-2 space-x-2 transform -translate-x-1/2 bg-white rounded-lg shadow-md top-2 left-1/2">
                <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder={'숨길 장소를 검색해보세요!'}
                    className="rounded-md outline-none w-72"
                    onFocus={onFocus}
                />
                <button className="px-4 py-2">
                    <IoIosSearch />
                </button>
            </div>
            {searchedLocation?.name && (
                <div className="absolute top-20 w-[360px] h-[48px] left-1/2 transform -translate-x-1/2 z-10 bg-slate-200 rounded-2xl p-2 flex items-center justify-between">
                    <LuMapPin />
                    <span className="flex-1 ml-2">{searchedLocation.name}</span>
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
                minZoom={6}
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
                        <img
                            src="https://www.svgrepo.com/show/372536/map-marker.svg"
                            alt="marker"
                            className="w-[30px] h-[30px] transform -translate-x-1/2 -translate-y-full"
                        />
                    </Marker>
                )}
                {nearbyLetters.map((letter) => (
                    <Marker
                        key={letter.id}
                        longitude={letter.longitude}
                        latitude={letter.latitude}
                    >
                        <div
                            className="p-1 bg-gray-100 rounded-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleSelectedLetter(letter);
                            }}
                        >
                            <img
                                src="/bottle.png"
                                className="w-full h-5 rounded-lg"
                            />
                        </div>
                    </Marker>
                ))}
                {searchedLocation && (
                    <Marker
                        longitude={parseFloat(searchedLocation.lon)}
                        latitude={parseFloat(searchedLocation.lat)}
                        anchor="bottom"
                        rotation={direction || 0}
                    >
                        <img
                            src="https://www.svgrepo.com/show/372536/map-marker.svg"
                            alt="marker"
                            className="w-[30px] h-[30px] transform -translate-x-1/2 -translate-y-full"
                        />
                    </Marker>
                )}
            </Map>
        </div>
    );
};
