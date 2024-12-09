import React from 'react';

import { Overlay } from '@/components/Common/Overlay/Overlay';

interface ModalProps {
    height?: string;
    children: React.ReactNode;
    clickEvent: () => void;
}

export const Modal = ({ height, children, clickEvent }: ModalProps) => {
    const heightValue = height ? height : 'h-[200px]';

    return (
        <Overlay>
            <div
                className={`bg-white w-[370px] ${heightValue} rounded-2xl p-2 relative shadow-lg animate-fade-up`}
                onClick={clickEvent}
            >
                <div className="relative h-full">{children}</div>
            </div>
        </Overlay>
    );
};
