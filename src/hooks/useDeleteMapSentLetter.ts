import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { deleteMapSentLetter } from '@/service/MapLetter/deleteMapSentLetter';

type UseDeleteMapSentLettersProps = {
    letterIds: number[];
};

export const useDeleteMapSentLetter = (
    { letterIds }: UseDeleteMapSentLettersProps,
    options?: UseMutationOptions<number[], Error, void>
) => {
    return useMutation<number[], Error, void>({
        mutationFn: async () => {
            const response = await deleteMapSentLetter({
                letterIds
            });
            return response.result;
        },
        ...options
    });
};
