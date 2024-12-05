import { useToastStore } from '@/hooks/useToastStore';
import { useMutation } from 'react-query';
import { createLetter } from '@/service/letter';
import { LetterType, CreateLetterResponseType } from '@/types/letter';

export const useCreateLetter = () => {
    const { addToast } = useToastStore();
    return useMutation<CreateLetterResponseType, Error, LetterType>(
        (letterData) => createLetter(letterData),
        {
            onSuccess: (data) => {
                addToast(data.message, 'success');
            },
            onError: (error) => {
                console.error('편지 생성 실패:', error.error);
            }
        }
    );
};
