import React from 'react';
import { useModal, useToastStore } from '@/hooks';
import { deleteKeywordLetters } from '@/service/letter/delete/deleteKeywordLetters';
import { useQueryClient } from '@tanstack/react-query';
import { DeleteLetterType } from '@/types/letter';

type DeleteModalProps = {
    checkedItems: DeleteLetterType[];
    handleRefresh: () => void;
    apiEndPoint: string;
};

export const DeleteModal = ({
    checkedItems,
    handleRefresh,
    apiEndPoint
}: DeleteModalProps) => {
    const queryClient = useQueryClient();
    const { closeModal, ModalComponent } = useModal();
    const { addToast } = useToastStore();

    const handleDelete = async () => {
        const response = await deleteKeywordLetters(checkedItems);
        if (response.isSuccess) {
            addToast('삭제가 완료되었습니다.', 'success');
            handleRefresh();
            queryClient.invalidateQueries({
                queryKey: ['storageLetters', apiEndPoint]
            });
            closeModal();
            return;
        }
        addToast('삭제에 실패했습니다.', 'warning');
        return;
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-3">
            <div className="text-bold">정말 삭제하시겠습니까?</div>
            <div className="flex flex-row items-center justify-center w-full gap-1">
                <button
                    onClick={handleDelete}
                    className="px-3 py-1 text-white rounded-sm bg-sample-blue"
                >
                    예
                </button>
                <button
                    onClick={closeModal}
                    className="px-3 py-1 bg-white border rounded-sm border-sample-blue text-sample-blue"
                >
                    아니오
                </button>
            </div>
        </div>
    );
};
