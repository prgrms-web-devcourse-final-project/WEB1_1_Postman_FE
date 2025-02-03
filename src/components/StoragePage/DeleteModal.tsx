import React from 'react';
import { useModal } from '@/hooks';

type DeleteModalProps = {
    handleDelete: () => void;
};

export const DeleteModal = ({ handleDelete }: DeleteModalProps) => {
    const { closeModal } = useModal();

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
