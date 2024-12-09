import React from 'react';
import { useLocation } from 'react-router-dom';

interface ContainerProps {
    px?: number;
    pb?: number;
    children?: React.ReactNode;
}

const gradientStyle = {
    background:
        'linear-gradient(to top, rgb(102, 177, 255), rgba(122, 208, 252, 0.3))'
};

export const Container: React.FC<ContainerProps> = ({ px = 0, children }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <div
            className={`px-${px} py-6 w-full h-[100vh] overflow-auto scrollbar-hide`}
            style={isHomePage ? gradientStyle : {}}
        >
            {children}
        </div>
    );
};
