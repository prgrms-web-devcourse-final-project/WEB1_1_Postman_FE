import { postReportKeywordLetter } from '@/service/Report/postReportKeywordLetter';
import { ApiResponseType } from '@/types/apiResponse';
import { PostReportKeywordLetterResponseType } from '@/types/report';
import { useMutation } from '@tanstack/react-query';

export const usePostNearByLetterStorage = (
    letterId: number,
    description: string
) => {
    return useMutation<
        ApiResponseType<PostReportKeywordLetterResponseType>,
        Error,
        void
    >({
        mutationFn: async () => {
            return await postReportKeywordLetter({ letterId, description });
        }
    });
};
