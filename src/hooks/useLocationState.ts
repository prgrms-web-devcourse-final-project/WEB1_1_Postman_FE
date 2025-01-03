import { useState, useEffect } from 'react';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { useSearchStore } from '@/stores/useSearchStore';
import { useNearbyLetters } from './useNearbyLetters';

export const useLocationState = (
    setNearbyLettersLength: (length: number) => void
) => {
    const { currentLocation } = useCurrentLocation();
    const { searchedLocation } = useSearchStore();
    const [viewState, setViewState] = useState({
        longitude: 127.0,
        latitude: 37.5,
        zoom: 11
    });

    const { nearbyLetters } = useNearbyLetters(currentLocation);

    useEffect(() => {
        setNearbyLettersLength(nearbyLetters.length);
    }, [nearbyLetters, setNearbyLettersLength]);

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

    return { viewState, setViewState };
};
