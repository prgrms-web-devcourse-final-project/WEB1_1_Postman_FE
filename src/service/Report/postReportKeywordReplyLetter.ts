import { defaultApi } from '@/service/api';
import { ApiResponseType } from '@/types/apiResponse';
import { PostReportKeywordLetterResponseType } from '@/types/report';

type postReportKeywordReplyLetterRequestProps = {
    replyLetterId: number;
    description: string;
};

type postReportKeywordLetterResponse =
    ApiResponseType<PostReportKeywordLetterResponseType>;

export async function postReportKeywordReplyLetter({
    replyLetterId,
    description
}: postReportKeywordReplyLetterRequestProps): Promise<postReportKeywordLetterResponse> {
    const api = defaultApi();
    const response = await api.post<postReportKeywordLetterResponse>(
        `/letters/reply/${replyLetterId}/complaint`,
        {
            data: {
                description
            }
        }
    );
    return response.data;
}
