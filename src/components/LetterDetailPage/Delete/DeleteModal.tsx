import { Margin } from '@/components/Common/Margin/Margin';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDeleteKeywordLetterReplyKeywordLetter } from '@/hooks/useDeleteKeywordLetterReplyKeywordLetter';
import { useToastStore } from '@/hooks';

type DeleteModalProps = {
    closeModal: () => void;
};

export const DeleteModal = ({ closeModal }: DeleteModalProps) => {
    const navigate = useNavigate();
    const { dataType, letterId } = useParams<{
        dataType: string;
        letterId: string;
    }>();
    const location = useLocation();
    const basePath = location.pathname.split('/')[2];

    const transformedLetterType = dataType === 'sent' ? 'SEND' : 'RECEIVE';
    const transformedBoxType =
        basePath === 'keyword' ? 'LETTER' : 'REPLY_LETTER';

    const mutation = useDeleteKeywordLetterReplyKeywordLetter({
        letterId: Number(letterId),
        boxType: transformedLetterType,
        letterType: transformedBoxType
    });

    const { addToast } = useToastStore();

    const handleDelete = () => {
        mutation.mutate(undefined, {
            onSuccess: () => {
                closeModal();
                addToast('편지 삭제에 성공했습니다.', 'success');
                navigate('/storage/keyword');
            },
            onError: () => {
                addToast('편지 삭제에 실패했습니다.', 'error');
            }
        });
    };

    return (
        <div className="flex flex-col bg-white rounded-2xl items-center justify-center w-full h-full p-4">
            <Margin top={10} />
            <span className="font-bold mb-4 text-2xl">
                편지를 삭제하시겠습니까?
            </span>

            <div className="flex-center gap-2">
                <button
                    onClick={closeModal}
                    className="mt-6 bg-slate-300 w-24 text-white px-4 py-2 rounded-lg"
                >
                    닫기
                </button>
                <button
                    onClick={handleDelete}
                    className="mt-6 bg-slate-500 w-24 text-white px-4 py-2 rounded-lg"
                >
                    삭제하기
                </button>
            </div>
        </div>
    );
};
