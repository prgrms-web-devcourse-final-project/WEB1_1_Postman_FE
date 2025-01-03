import { useMutation } from '@tanstack/react-query';
import { postMapReplyLetter } from '@/service/letter/create/postMapReplyLetter';
import { useToastStore } from '@/hooks/useToastStore';
import { ApiErrorType } from '@/types/apiError';
import { useNavigate } from 'react-router-dom';
import { MapReplyType } from '@/types/letter';

export const usePostMapReplyLetter = () => {
    const { addToast } = useToastStore();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ['postMapReplyLetter'],
        mutationFn: (letterData: MapReplyType) =>
            postMapReplyLetter(letterData),

        onSuccess: () => {
            navigate('/letter/success');
            localStorage.removeItem('title');
            localStorage.removeItem('letterContent');
            localStorage.removeItem('letter');
            localStorage.removeItem('font');
        },
        onError: (error: ApiErrorType) => {
            addToast(`${error.message}`, 'warning');
        }
    });
};
