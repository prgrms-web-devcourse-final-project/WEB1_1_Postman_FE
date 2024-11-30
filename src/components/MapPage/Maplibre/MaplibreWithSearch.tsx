import React, { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import mapStyle from './map_style.json';
import { StyleSpecification } from 'maplibre-gl';
import { IoIosSearch } from 'react-icons/io';

export const MaplibreWithSearch = () => {
    const [searchText, setSearchText] = useState('');
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

    const handleSearch = async () => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}`
            );
            const data = await response.json();

            if (data.length > 0) {
                setViewState({
                    longitude: parseFloat(data[0].lon),
                    latitude: parseFloat(data[0].lat),
                    zoom: 16
                });
            } else {
                alert('검색 결과가 없습니다.');
            }
        } catch (error) {
            console.error('검색 중 에러:', error);
        }
    };

    return (
        <div className="relative w-full h-[500px]">
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10 bg-white rounded-lg shadow-md p-2 flex items-center space-x-2">
                <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="원하는 위치를 검색해보세요!"
                    className="w-56 p-2 rounded-md outline-none"
                />
                <button onClick={handleSearch} className="px-4 py-2">
                    <IoIosSearch />
                </button>
            </div>

            <Map
                {...viewState}
                onMove={(evt) => setViewState(evt.viewState)}
                initialViewState={viewState}
                style={{ width: '100%', height: '100%' }}
                mapStyle={mapStyle as StyleSpecification}
                mapLib={maplibregl}
                minZoom={6}
                maxZoom={18}
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
                            style={{
                                width: '30px',
                                height: '30px',
                                transform: 'translate(-50%, -100%)'
                            }}
                        />
                    </Marker>
                )}
            </Map>
        </div>
    );
};
