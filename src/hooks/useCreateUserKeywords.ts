import { useMutation } from '@tanstack/react-query';
import { createUserKeyword } from '@/service/keyword/createUserKeyword';

export const useCreateUserKeywords = () => {
    const mutation = useMutation({
        mutationFn: createUserKeyword,
        onSuccess: () => {},
        onError: (error) => {
            console.error('키워드 생성 실패:', error);
        }
    });

    return mutation;
};
