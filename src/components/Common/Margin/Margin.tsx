import React from 'react';

interface MarginProps {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    children?: React.ReactNode;
}

export const Margin: React.FC<MarginProps> = ({
    top = 0,
    bottom = 0,
    left = 0,
    right = 0,
    children
}) => {
    const style = {
        marginTop: `${top}px`,
        marginBottom: `${bottom}px`,
        marginLeft: `${left}px`,
        marginRight: `${right}px`
    };

    return <div style={style}>{children}</div>;
};
