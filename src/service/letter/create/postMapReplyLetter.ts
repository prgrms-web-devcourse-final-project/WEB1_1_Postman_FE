import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';

type ppostMapReplyLetterRequestProps = {
    sourceLetter: number;
    content: string;
    font: string;
    paper: string;
    label: string;
};

type postMapReplyLetterResponse = ApiResponseType<string>;

export async function postMapReplyLetter({
    sourceLetter,
    content,
    font,
    paper,
    label
}: ppostMapReplyLetterRequestProps): Promise<postMapReplyLetterResponse> {
    const api = defaultApi();
    const response = await api.post<postMapReplyLetterResponse>(`/map/reply`, {
        sourceLetter,
        content,
        font,
        paper,
        label
    });
    return response.data;
}
