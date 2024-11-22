import React from 'react';

type NavigationItemProps = {
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
};

export const NavigationItem = ({
    icon,
    label,
    isActive,
    onClick
}: NavigationItemProps) => {
    return (
        <button
            className={`flex flex-col items-center justify-center p-2 ${
                isActive ? 'text-blue-500' : 'text-gray-400'
            }`}
            onClick={onClick}
        >
            <div className={`${isActive ? 'fill-blue-500' : 'fill-gray-400'}`}>
                {icon}
            </div>
            <span className="text-sm">{label}</span>
        </button>
    );
};
