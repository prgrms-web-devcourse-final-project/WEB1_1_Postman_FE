import React from 'react';

interface ContainerProps {
    px?: number;
    pt?: number;
    pb?: number;
    children?: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
    px = 0,
    pt = 0,
    pb = 0,
    children
}) => {
    return (
        <div
            className={`flex-1 px-${px} pt-${pt} pb-${pb} w-full h-full overflow-auto scrollbar-hide`}
        >
            {children}
        </div>
    );
};
