import { useQuery } from '@tanstack/react-query';
import { getNearbyLetters } from '@/service/MapLetter/getNearbyLetters';
import { NearbyLettersResponseType } from '@/types/letter';

export const useNearbyLetters = (
    currentLocation: { longitude: number; latitude: number } | null
) => {
    const query = useQuery({
        queryKey: [
            'nearbyLetters',
            currentLocation?.latitude,
            currentLocation?.longitude
        ],
        queryFn: async (): Promise<NearbyLettersResponseType['result']> => {
            if (!currentLocation) {
                return [];
            }

            const response = await getNearbyLetters({
                latitude: currentLocation.latitude.toString(),
                longitude: currentLocation.longitude.toString()
            });

            if (!response.isSuccess || !Array.isArray(response.result)) {
                return [];
            }

            return response.result.map((letter) => ({
                letterId: letter.letterId,
                latitude: letter.latitude,
                longitude: letter.longitude,
                title: letter.title,
                createdAt: letter.createdAt,
                distance: letter.distance,
                target: letter.target,
                createUserNickname: letter.createUserNickname,
                label: letter.label,
                description: letter.description
            }));
        },
        enabled: !!currentLocation,

        select: (data: NearbyLettersResponseType['result']) => data
    });

    return {
        nearbyLetters: query.data || [],
        isLoading: query.isLoading,
        error: query.error
    };
};
