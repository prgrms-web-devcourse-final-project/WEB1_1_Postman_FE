import { useMutation } from '@tanstack/react-query';
import { createLetter } from '@/service/letter/create/createLetter';
import { useToastStore } from '@/hooks/useToastStore';
import { LetterType } from '@/types/letter';
import { ApiErrorType } from './../types/apiError';
import { useNavigate } from 'react-router-dom';

export const useCreateLetter = () => {
    const { addToast } = useToastStore();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ['createLetter'],
        mutationFn: (letterData: LetterType) => createLetter(letterData),

        onSuccess: () => {
            navigate('/letter/success');
        },
        onError: (error: ApiErrorType) => {
            addToast(`${error.message}`, 'warning');
        }
    });
};
