import React from 'react';

interface ContainerProps {
    children?: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
    return <div className="px-6 pb-[100px] w-full h-full">{children}</div>;
};
