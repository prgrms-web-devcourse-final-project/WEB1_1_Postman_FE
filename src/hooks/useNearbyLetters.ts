import { useEffect, useState } from 'react';
import * as turf from '@turf/turf';

type Letter = {
    id: number;
    longitude: number;
    latitude: number;
    title: string;
    keyword: string;
    date: string;
};

export const useNearbyLetters = (
    currentLocation: { longitude: number; latitude: number } | null,
    letters: Letter[],
    distanceThreshold: number = 500
) => {
    const [nearbyLetters, setNearbyLetters] = useState<Letter[]>([]);

    useEffect(() => {
        if (currentLocation) {
            const filteredLetters = letters.filter((letter) => {
                const from = turf.point([
                    currentLocation.longitude,
                    currentLocation.latitude
                ]);
                const to = turf.point([letter.longitude, letter.latitude]);
                const distance = turf.distance(from, to, { units: 'meters' });

                console.log(`편지: ${letter.title}, 거리: ${distance}m`);
                return distance <= distanceThreshold;
            });
            setNearbyLetters(filteredLetters);
        } else {
            setNearbyLetters([]);
        }
    }, [currentLocation, letters, distanceThreshold]);

    return nearbyLetters;
};
