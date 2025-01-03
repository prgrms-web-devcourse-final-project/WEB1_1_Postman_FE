import { RiDeleteBin5Line } from 'react-icons/ri';
import { useState } from 'react';
import { DeleteModal } from './DeleteModal';

export const DeleteButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button className=" flex-center gap-1 p-2" onClick={openModal}>
                <RiDeleteBin5Line />
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
                        <DeleteModal closeModal={closeModal} />
                    </div>
                </div>
            )}
        </>
    );
};
