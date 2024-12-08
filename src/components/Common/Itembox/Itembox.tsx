import React from 'react';

interface ItemboxProps {
    width?: string;
    height?: string;
    padding?: string;
    children: React.ReactNode;
    onClick: () => void;
}

// 커스텀 스타일 값은 px로 받아옵니다
export const Itembox = ({
    width = '50px',
    height = '50px',
    padding = '0',
    children,
    onClick
}: ItemboxProps) => {
    const itemboxScaleStyle = `w-[${width}] h-[${height}] p-${padding}`;

    return (
        <div
            className={`${itemboxScaleStyle} aspect-square bg-white p-1 rounded-md flex items-center justify-center border border-sample-gray aspect-square`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};
