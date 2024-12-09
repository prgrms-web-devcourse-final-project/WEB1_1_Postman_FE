import React from 'react';

interface ContainerProps {
    px?: number;
    pb?: number;
    children?: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ px = 0, children }) => {
    return (
        <div
            className={`px-${px} py-6 w-full h-full overflow-auto scrollbar-hide`}
        >
            {children}
        </div>
    );
};
