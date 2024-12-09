import { Margin } from '@/components/Common/Margin/Margin';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDeleteKeywordLetter } from '@/hooks/useDeleteKeywordLetter';
import { useDeleteMapSentLetter } from '@/hooks/useDeleteMapSentLetter';
import { useDeleteKeywordReplyLetter } from '@/hooks/useDeleteKeywordReplyLetter';

import { useToastStore } from '@/hooks';
import { useDeleteMapReceivedLetter } from '@/hooks/useDeleteMapReceivedtLetter';

type DeleteModalProps = {
    closeModal: () => void;
};

export const DeleteModal = ({ closeModal }: DeleteModalProps) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const letterType = pathname.split('/')[2];
    const { dataType, letterId, replyLetterId } = useParams<{
        dataType: string;
        letterId: string;
        replyLetterId: string;
    }>();
    const transformedLetterType = dataType === 'sent' ? 'SEND' : 'RECEIVE';

    const keywordMutation = useDeleteKeywordLetter({
        letterId: Number(letterId) || Number(replyLetterId),
        boxType: transformedLetterType
    });

    const mapMutation = useDeleteMapSentLetter({
        letterIds: [Number(letterId) || Number(replyLetterId)]
    });

    const keywordReplyMutation = useDeleteKeywordReplyLetter({
        letterId: Number(letterId) || Number(replyLetterId),
        boxType: transformedLetterType
    });

    const mapReceivedMutation = useDeleteMapReceivedLetter({
        letterIds: [Number(letterId) || Number(replyLetterId)]
    });

    const mutation =
        letterType === 'keyword'
            ? dataType === 'received'
                ? keywordReplyMutation
                : keywordMutation
            : letterType === 'map' && dataType === 'received'
              ? mapReceivedMutation
              : mapMutation;

    const { addToast } = useToastStore();

    const handleDelete = () => {
        mutation.mutate(undefined, {
            onSuccess: () => {
                closeModal();
                addToast('편지 삭제에 성공했습니다.', 'success');
                navigate(
                    letterType === 'keyword'
                        ? '/storage/keyword'
                        : '/storage/map'
                );
            },
            onError: () => {
                addToast('편지 삭제에 실패했습니다.', 'error');
            }
        });
    };

    return (
        <div className="flex flex-col  font-sans bg-white rounded-2xl items-center justify-center w-60 h-28 p-4">
            <Margin top={10} />
            <span className="font-bold mb-4 text-xl">
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
                    className="mt-6 bg-theme-skyblue w-24 text-white px-4 py-2 rounded-lg"
                >
                    삭제하기
                </button>
            </div>
        </div>
    );
};
