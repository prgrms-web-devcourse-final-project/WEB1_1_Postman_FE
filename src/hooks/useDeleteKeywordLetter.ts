import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { deleteKeywordLetter } from '@/service/detail/deleteKeywordLetter';

type UseDeleteKeywordLetterProps = {
    letterId: number;
    boxType: string;
};

export const useDeleteKeywordLetter = (
    { letterId, boxType }: UseDeleteKeywordLetterProps,
    options?: UseMutationOptions<string, Error, void>
) => {
    return useMutation<string, Error, void>({
        mutationFn: async () => {
            const response = await deleteKeywordLetter({
                letterId,
                boxType
            });
            return response.result;
        },
        ...options
    });
};
