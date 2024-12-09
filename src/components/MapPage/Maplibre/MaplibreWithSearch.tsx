import { useState } from 'react';
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
import { NearbyLettersResponseType } from '@/types/letter';
import { useLocationState } from '@/hooks/useLocationState';
import { BottleLetter } from '@/components/Common/BottleLetter/BottleLetter';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '@/components/Common/TopBar/TopBar';

type MaplibreWithSearchProps = {
    onFocus: () => void;
    setNearbyLettersLength: (length: number) => void;
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
    const navigate = useNavigate();

    const onBackClick = () => {
        navigate(-1);
    };

    return (
        <div className="relative h-screen">
            {/* <TopBar handleBackClick={onBackClick} /> */}
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
                <div className="absolute top-28 w-[340px] h-[48px] left-1/2 transform -translate-x-1/2 z-10 bg-slate-200 rounded-2xl p-2 flex items-center justify-between">
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
                {nearbyLetters.map(
                    (letter: NearbyLettersResponseType['result'][0]) => (
                        <Marker
                            key={letter.letterId}
                            longitude={letter.longitude}
                            latitude={letter.latitude}
                        >
                            <div
                                className="relative flex items-center justify-center w-8 h-8 bg-white rounded-full cursor-pointer transform"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSelectedLetter(letter);
                                }}
                            >
                                <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2">
                                    <BottleLetter
                                        Letter={{ label: letter.label }}
                                    />
                                </div>
                                <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white"></div>
                            </div>
                        </Marker>
                    )
                )}
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
