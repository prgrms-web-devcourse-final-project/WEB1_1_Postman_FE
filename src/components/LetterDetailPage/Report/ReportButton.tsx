import { AiOutlineAlert } from 'react-icons/ai';
import { useState } from 'react';
import { ReportModal } from './ReportModal';

export const ReportButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button className="flex-center gap-1 p-2" onClick={openModal}>
                <AiOutlineAlert />
            </button>

            {isModalOpen && (
                <div
                    className="fixed inset-0 mx-auto min-w-[375px] max-w-[475px] bg-black bg-opacity-50 flex-center z-50"
                    onClick={closeModal}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-lg p-6"
                    >
                        <ReportModal closeModal={closeModal} />
                    </div>
                </div>
            )}
        </>
    );
};
