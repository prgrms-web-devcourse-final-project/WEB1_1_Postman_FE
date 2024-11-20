import React from 'react';
import { Overlay } from '@/components/common/Overlay/Overlay';

interface ModalProps {
    children: React.ReactNode;
    clickEvent: () => void;
}

export const Modal = ({ children }: ModalProps) => {
    return (
        <Overlay>
            <div className="bg-white w-[370px] h-[200px] rounded-2xl p-2 relative shadow-lg animate-fadeIn">
                <div className="relative h-full">{children}</div>
            </div>
        </Overlay>
    );
};
