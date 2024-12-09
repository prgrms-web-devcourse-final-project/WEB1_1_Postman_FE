import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';

type getCheckMapReplyLetterRequestProps = {
    letterId: number;
};

type getCheckMapReplyLetterResponse = ApiResponseType<boolean>;

export async function getCheckMapReplyLetter({
    letterId
}: getCheckMapReplyLetterRequestProps): Promise<getCheckMapReplyLetterResponse> {
    const api = defaultApi();
    const response = await api.get<getCheckMapReplyLetterResponse>(
        `/map/reply/check${letterId}`
    );
    return response.data;
}
