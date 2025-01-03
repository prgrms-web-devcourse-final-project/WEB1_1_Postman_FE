import React from 'react';
import { Modal } from '@/components/Common/Modal/Modal';
import { useState } from 'react';

/**
 * @param openModal 모달을 여는 함수입니다.
 * @param ModalComponent 모달 컴포넌트 입니다. 모달 안에  jsx 요소를 넣어 모달 컨텐츠로 쓸 수 있습니다.
 */
export function useModal() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const ModalComponent = ({
        children,
        height
    }: {
        children: React.ReactNode;
        height: string;
    }) =>
        isOpen ? (
            <Modal clickEvent={closeModal} height={height}>
                {children}
            </Modal>
        ) : null;

    return {
        openModal,
        closeModal,
        ModalComponent
    };
}
