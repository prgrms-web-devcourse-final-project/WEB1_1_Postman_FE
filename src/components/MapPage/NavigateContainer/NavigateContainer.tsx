import React from 'react';

interface NavigateContainerProps {
    count: number;
}

export const NavigateContainer: React.FC<NavigateContainerProps> = ({
    count
}) => {
    return (
        <div className="flex-center bg-gray-200 rounded-2xl shadow-md w-[300px] p-2">
            <p className="text-lg font-bold text-gray-700  ">
                반경 500m 내 {count}개
            </p>
        </div>
    );
};
