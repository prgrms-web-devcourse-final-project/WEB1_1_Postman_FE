import { useState, useEffect } from 'react';

export const useCurrentLocation = () => {
    const [currentLocation, setCurrentLocation] = useState<{
        longitude: number;
        latitude: number;
    } | null>(null);

    const [direction, setDirection] = useState<number | null>(null);

    useEffect(() => {
        if ('geolocation' in navigator) {
            const geoWatchId = navigator.geolocation.watchPosition(
                (position) => {
                    const newLocation = {
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude
                    };
                    setCurrentLocation(newLocation);
                },
                (error) => console.error('위치 가져오기 실패:', error),
                {
                    enableHighAccuracy: true,
                    maximumAge: 10000,
                    timeout: 5000
                }
            );
            return () => navigator.geolocation.clearWatch(geoWatchId);
        }

        const handleOrientation = (event: DeviceOrientationEvent) =>
            setDirection(event.alpha || 0);
        window.addEventListener('deviceorientation', handleOrientation);

        return () =>
            window.removeEventListener('deviceorientation', handleOrientation);
    }, []);

    return { currentLocation, direction };
};
