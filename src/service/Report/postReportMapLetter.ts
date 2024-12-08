import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';
import { PostReportKeywordLetterResponseType } from '@/types/report';

type postReportMapLetterRequestProps = {
    letterId: number;
    description: string;
};

type postMapKeywordLetterResponse =
    ApiResponseType<PostReportKeywordLetterResponseType>;

export async function postReportMapLetter({
    letterId,
    description
}: postReportMapLetterRequestProps): Promise<postMapKeywordLetterResponse> {
    const api = defaultApi();
    const response = await api.post<postMapKeywordLetterResponse>(
        `/map/${letterId}/complaint`,
        {
            data: {
                description
            }
        }
    );
    return response.data;
}
