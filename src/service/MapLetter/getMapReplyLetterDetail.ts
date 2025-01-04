import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';
import { GetMapReplyLetterDetailResponseType } from '@/types/letter';

type MapReplyLetterDetailRequestProps = {
    letterId: string;
};

type MapReplyLetterDetailResponse =
    ApiResponseType<GetMapReplyLetterDetailResponseType>;

export async function getMapReplyLetterDetail({
    letterId
}: MapReplyLetterDetailRequestProps): Promise<MapReplyLetterDetailResponse> {
    const api = defaultApi();

    const response = await api.get<MapReplyLetterDetailResponse>(
        `/map/reply/${letterId}`
    );
    return response.data;
}
