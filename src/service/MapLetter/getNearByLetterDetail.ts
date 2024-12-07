import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';
import { NearbyLettersDetailResponseType } from '@/types/letter';

type NearbyLettersRequestProps = {
    latitude: string;
    longitude: string;
    letterId: number;
};

type NearbyLettersResponse = ApiResponseType<NearbyLettersDetailResponseType>;

export async function getNearByLetterDetail({
    latitude,
    longitude,
    letterId
}: NearbyLettersRequestProps): Promise<NearbyLettersResponse> {
    const api = defaultApi();
    const response = await api.get<NearbyLettersResponse>(`/map/${letterId}`, {
        params: { latitude, longitude }
    });
    console.log(response.data);
    return response.data;
}