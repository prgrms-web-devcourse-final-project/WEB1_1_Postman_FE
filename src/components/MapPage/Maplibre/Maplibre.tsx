import React, { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import mapStyle from './map_style.json';
import { StyleSpecification } from 'maplibre-gl';

export const Maplibre = () => {
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

    return (
        <div>
            <div
                style={{
                    height: '812px',
                    width: '768PX',
                    position: 'relative'
                }}
                className="mx-auto mt-4"
            >
                <Map
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
        </div>
    );
};
