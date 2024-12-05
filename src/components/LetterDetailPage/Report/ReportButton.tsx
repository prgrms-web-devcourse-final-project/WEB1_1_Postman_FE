import { AiOutlineAlert } from 'react-icons/ai';
import { useState } from 'react';
import { ReportModal } from './ReportModal';

type ReportButtonProps = {
    id: string;
};

export const ReportButton = ({ id }: ReportButtonProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button className="flex-center gap-1 p-2 " onClick={openModal}>
                <AiOutlineAlert />
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <ReportModal id={id} closeModal={closeModal} />
                </div>
            )}
        </>
    );
};
