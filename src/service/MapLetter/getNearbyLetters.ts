import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';
import { NearbyLettersResponseType } from '@/types/letter';

type NearbyLettersRequestProps = {
    latitude: string;
    longitude: string;
};

type NearbyLettersResponse = ApiResponseType<NearbyLettersResponseType>;

export async function getNearbyLetters({
    latitude,
    longitude
}: NearbyLettersRequestProps): Promise<NearbyLettersResponse> {
    const api = defaultApi();
    const response = await api.get<NearbyLettersResponse>(`/map`, {
        params: { latitude, longitude }
    });
    return response.data;
}
