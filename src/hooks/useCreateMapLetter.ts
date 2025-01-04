import { useLetterDB } from './useLetterDB';
import { useMutation } from '@tanstack/react-query';
import { createMapLetter } from '@/service/letter/create/createMapLetter';
import { useToastStore } from './useToastStore';
import { useNavigate } from 'react-router-dom';

export const useCreateMapLetter = () => {
    const { addToast } = useToastStore();

    const navigate = useNavigate();
    const { clearAllLetters } = useLetterDB();

    const mutation = useMutation({
        mutationFn: createMapLetter,
        onSuccess: () => {
            addToast('지도 편지를 전송했습니다.', 'success');
            navigate('/letter/success');
            clearAllLetters();
        },
        onError: () => {
            addToast('지도 편지를 실패했습니다.', 'error');
        }
    });
    return mutation;
};
