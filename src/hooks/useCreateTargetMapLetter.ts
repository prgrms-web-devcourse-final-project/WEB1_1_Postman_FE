import { useMutation } from '@tanstack/react-query';
import { useToastStore } from './useToastStore';
import { useNavigate } from 'react-router-dom';
import { createMapTargerLetter } from '@/service/letter/create/createMapTargerLetter';
import { useLetterDB } from './useLetterDB';

export const useCreateTargetMapLetter = () => {
    const { addToast } = useToastStore();
    const navigate = useNavigate();
    const { clearAllLetters } = useLetterDB();
    const mutation = useMutation({
        mutationFn: createMapTargerLetter,
        onSuccess: () => {
            addToast('지도 편지를 전송했습니다.', 'success');
            navigate('/letter/success');
            clearAllLetters();
        },
        onError: (error) => {
            console.error(error);
            addToast('지도 편지를 실패했습니다.', 'error');
        }
    });
    return mutation;
};
