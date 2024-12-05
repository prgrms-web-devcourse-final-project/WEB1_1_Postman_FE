import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';
import { NearbyLettersResponseType } from '@/types/letter';

type NearbyLettersRequestProps = {
    latitude: string;
    longitude: string;
};

type NearbyLettersResponse = ApiResponseType<NearbyLettersResponseType>;

export async function nearbyLetters({
    latitude,
    longitude
}: NearbyLettersRequestProps): Promise<NearbyLettersResponse> {
    const api = defaultApi();
    try {
        const response = await api.get<NearbyLettersResponse>(`/map`, {
            params: { latitude, longitude }
        });
        console.log('Response data:', response.data);
        if (!response.data.isSuccess) {
            throw new Error(
                response.data.message || 'Failed to fetch nearby letters'
            );
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching nearby letters:', error);
        throw error;
    }
}
