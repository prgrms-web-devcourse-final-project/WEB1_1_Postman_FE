import { postReportMapLetter } from '@/service/Report/postReportMapLetter';
import { ApiResponseType } from '@/types/apiResponse';
import { PostReportKeywordLetterResponseType } from '@/types/report';
import { useMutation } from '@tanstack/react-query';

export const usePostReportMapLetter = (
    letterId: number,
    description: string
) => {
    return useMutation<
        ApiResponseType<PostReportKeywordLetterResponseType>,
        Error,
        void
    >({
        mutationFn: async () => {
            return await postReportMapLetter({ letterId, description });
        }
    });
};
