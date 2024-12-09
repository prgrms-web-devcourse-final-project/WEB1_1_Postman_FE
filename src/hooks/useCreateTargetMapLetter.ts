import { useMutation } from '@tanstack/react-query';
import { useToastStore } from './useToastStore';
import { useNavigate } from 'react-router-dom';
import { createMapTargerLetter } from '@/service/letter/create/createMapTargerLetter';

export const useCreateTargetMapLetter = () => {
    const { addToast } = useToastStore();
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: createMapTargerLetter,
        onSuccess: () => {
            addToast('지도 편지를 전송했습니다.', 'success');
            navigate('/letter/success');
            localStorage.removeItem('maptitle');
            localStorage.removeItem('mapcontent');
            localStorage.removeItem('mapdescription');
            localStorage.removeItem('mapfont');
            localStorage.removeItem('mapletter');
            localStorage.removeItem('maplat');
            localStorage.removeItem('maplot');
            localStorage.removeItem('mapnickname');
        },
        onError: (error) => {
            console.error(error);

            addToast('지도 편지를 실패했습니다.', 'error');
        }
    });
    return mutation;
};
