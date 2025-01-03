import { postNearByLetterStorage } from '@/service/MapLetter/postNearbyLettersStorage';
import { ApiResponseType } from '@/types/apiResponse';
import { useMutation } from '@tanstack/react-query';

export const usePostNearByLetterStorage = (letterId: number) => {
    return useMutation<ApiResponseType<string>, Error, void>({
        mutationFn: async () => {
            return await postNearByLetterStorage({ letterId });
        }
    });
};
