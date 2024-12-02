import React, { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import mapStyle from './map_style.json';
import { StyleSpecification } from 'maplibre-gl';
import * as turf from '@turf/turf';
import { useSelectedLetterStore } from '@/stores/useSelectedLetterStore';
type Letter = {
    id: number;
    longitude: number;
    latitude: number;
    title: string;
    keyword: string;
    date: string;
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

export const Maplibre = () => {
    const { toggleSelectedLetter, clearSelectedLetter } =
        useSelectedLetterStore();
    const [currentLocation, setCurrentLocation] = useState<{
        longitude: number;
        latitude: number;
    } | null>(null);
    const [direction, setDirection] = useState<number | null>(null);
    const [viewState, setViewState] = useState({
        longitude: 127.0,
        latitude: 37.5,
        zoom: 11
    });
    const [filteredLetters, setFilteredLetters] = useState<Letter[]>([]);
    useEffect(() => {
        if (currentLocation) {
            const nearbyLetters = sampleLetters.filter((letter) => {
                const from = turf.point([
                    currentLocation.longitude,
                    currentLocation.latitude
                ]);
                const to = turf.point([letter.longitude, letter.latitude]);
                const distance = turf.distance(from, to, { units: 'meters' });

                console.log(`편지: ${letter.title}, 거리: ${distance}m`);

                return distance <= 500;
            });
            setFilteredLetters(nearbyLetters);
        }
    }, [currentLocation]);

    useEffect(() => {
        if ('geolocation' in navigator) {
            const geoWatchId = navigator.geolocation.watchPosition(
                (position) => {
                    const newLocation = {
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude
                    };
                    setCurrentLocation(newLocation);
                    setViewState((prev) => ({
                        ...prev,
                        ...newLocation,
                        zoom: 15
                    }));
                },
                (error) => console.error('위치 가져오기 실패:', error),
                { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
            );

            return () => navigator.geolocation.clearWatch(geoWatchId);
        }

        const handleOrientation = (event: DeviceOrientationEvent) =>
            setDirection(event.alpha || 0);
        window.addEventListener('deviceorientation', handleOrientation);

        return () =>
            window.removeEventListener('deviceorientation', handleOrientation);
    }, []);

    return (
        <div>
            <div className="mx-auto mt-4 relative h-[812px] w-full">
                <Map
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
                    {filteredLetters.map((letter) => (
                        <Marker
                            key={letter.id}
                            longitude={letter.longitude}
                            latitude={letter.latitude}
                        >
                            <div
                                className="bg-gray-100 p-1 rounded-sm"
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
                </Map>
            </div>
        </div>
    );
};
