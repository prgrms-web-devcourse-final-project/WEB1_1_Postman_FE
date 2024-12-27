import React from 'react';
import { useLocation } from 'react-router-dom';

interface ContainerProps {
    px?: number;
    pt?: number;
    pb?: number;
    children?: React.ReactNode;
}

const gradientStyle = {
    background:
        'linear-gradient(to top, rgb(102, 177, 255), rgba(122, 208, 252, 0.3))'
};

export const Container: React.FC<ContainerProps> = ({
    px = 0,
    pt = 0,
    pb = 0,
    children
}) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <div
            className={`flex-1 px-${px} pt-${pt} pb-${pb} w-full h-full overflow-auto scrollbar-hide`}
            style={isHomePage ? gradientStyle : {}}
        >
            {children}
        </div>
    );
};
