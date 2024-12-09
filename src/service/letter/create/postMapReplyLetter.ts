import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';

type ppostMapReplyLetterRequestProps = {
    sourceLetter: number;
};

type postMapReplyLetterResponse = ApiResponseType<string>;

export async function postMapReplyLetter({
    sourceLetter
}: ppostMapReplyLetterRequestProps): Promise<postMapReplyLetterResponse> {
    const api = defaultApi();
    const response = await api.post<postMapReplyLetterResponse>(
        `/map/reply/${sourceLetter}`
    );
    return response.data;
}
