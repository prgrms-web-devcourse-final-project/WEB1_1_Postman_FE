import React from 'react';

interface ItemboxProps {
    children: React.ReactNode;
}

export const Itembox = ({ children }: ItemboxProps) => {
    const itemBoxStyle = 'p-1 ';

    return (
        <div className="w-[50px] h-[50px] bg-slate-800 p-1 rounded-md flex items-center justify-center">
            <div className="w-full h-full">{children}</div>
        </div>
    );
};
