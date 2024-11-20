import React, { ReactNode } from 'react';

interface OverlayProps {
    children: ReactNode;
}

export const Overlay = ({ children }: OverlayProps) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-black/10">
            {children}
        </div>
    );
};
