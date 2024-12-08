import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';

type postNearByLetterStorageRequestProps = {
    letterId: number;
};

type postNearByLetterStorageResponse = ApiResponseType<string>;

export async function postNearByLetterStorage({
    letterId
}: postNearByLetterStorageRequestProps): Promise<postNearByLetterStorageResponse> {
    const api = defaultApi();
    const response = await api.post<postNearByLetterStorageResponse>(
        `/map/${letterId}`
    );
    return response.data;
}
