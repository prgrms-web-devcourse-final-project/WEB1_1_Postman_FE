import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { deleteKeywordReplyLetter } from '@/service/detail/deleteKeywordReplyLetter';

type UseDeleteKeywordReplyLetterProps = {
    letterId: number;
    boxType: string;
};

export const useDeleteKeywordReplyLetter = (
    { letterId, boxType }: UseDeleteKeywordReplyLetterProps,
    options?: UseMutationOptions<string, Error, void>
) => {
    return useMutation<string, Error, void>({
        mutationFn: async () => {
            const response = await deleteKeywordReplyLetter({
                letterId,
                boxType
            });
            return response.result;
        },
        ...options
    });
};
