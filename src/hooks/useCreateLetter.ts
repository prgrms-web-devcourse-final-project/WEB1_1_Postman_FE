import { ApiErrorType } from './../types/apiError';
import { useToastStore } from '@/hooks/useToastStore';
import { useMutation } from 'react-query';
import { createLetter } from '@/service/letter/create/createLetter';
import { LetterType, CreateLetterResponseType } from '@/types/letter';

export const useCreateLetter = () => {
    const { addToast } = useToastStore();
    return useMutation<CreateLetterResponseType, ApiErrorType, LetterType>(
        (letterData) => createLetter(letterData),
        {
            onSuccess: (data) => {
                addToast(data.message, 'success');
            },
            onError: (error) => {
                console.error('편지 생성 실패:', error.message);
            }
        }
    );
};
