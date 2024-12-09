import { useMutation } from '@tanstack/react-query';
import { postKeywordReplyLetter } from '@/service/letter/create/postKeywordReplyLetter';
import { useToastStore } from '@/hooks/useToastStore';
import { KeywordType } from '@/types/letter';
import { ApiErrorType } from './../types/apiError';
import { useNavigate } from 'react-router-dom';

export const usePostKeywordReplyLettter = () => {
    const { addToast } = useToastStore();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ['postKeywordReplyLetter'],
        mutationFn: (letterData: KeywordType) =>
            postKeywordReplyLetter(letterData),

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
