import { useQuery } from '@tanstack/react-query';
import { getNearByLetterDetail } from '@/service/MapLetter/getNearByLetterDetail';
import { NearbyLettersDetailResponseType } from '@/types/letter';

type UseNearbyLettersDetailProps = {
    longitude: string;
    latitude: string;
    letterId: string;
};

export const useNearbyLettersDetail = ({
    latitude,
    longitude,
    letterId
}: UseNearbyLettersDetailProps) => {
    return useQuery<NearbyLettersDetailResponseType, Error>({
        queryKey: ['getNearByLetterDetail', latitude, longitude, letterId],
        queryFn: async () => {
            const response = await getNearByLetterDetail({
                latitude: latitude,
                longitude: longitude,
                letterId
            });
            return response.result;
        },
        enabled: !!letterId
    });
};
