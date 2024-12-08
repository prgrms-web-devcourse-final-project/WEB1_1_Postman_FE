import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';
import { PostReportKeywordLetterResponseType } from '@/types/report';

type postReportKeywordLetterRequestProps = {
    letterId: number;
    description: string;
};

type postReportKeywordLetterResponse =
    ApiResponseType<PostReportKeywordLetterResponseType>;

export async function postReportKeywordLetter({
    letterId,
    description
}: postReportKeywordLetterRequestProps): Promise<postReportKeywordLetterResponse> {
    const api = defaultApi();
    const response = await api.post<postReportKeywordLetterResponse>(
        `/letters/${letterId}/complaint`,
        {
            data: {
                description
            }
        }
    );
    return response.data;
}
