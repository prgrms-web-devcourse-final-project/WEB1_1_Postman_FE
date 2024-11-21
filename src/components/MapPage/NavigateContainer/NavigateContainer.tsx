import React from 'react';

interface NavigateContainerProps {
    title: string;
    distance: string;
    count: number;
    clickEvent: () => void;
}

export const NavigateContainer: React.FC<NavigateContainerProps> = ({
    title,
    distance,
    count,
    clickEvent
}) => {
    return (
        <div className="flex items-center justify-between bg-gray-200 rounded-2xl shadow-md w-[350px] p-4">
            <div className="flex items-center gap-4 overflow-hidden">
                <div className="px-6 py-4 text-sm text-gray-700 bg-gray-300 rounded-full w-[120px] text-center overflow-hidden whitespace-nowrap box-border text-ellipsis">
                    {title}
                </div>
                <p className="overflow-hidden text-sm text-gray-700 whitespace-nowrap text-ellipsis  w-[140px]">
                    반경 {distance} 내 {count}개
                </p>
                <button onClick={clickEvent}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="text-gray-700 w-7 h-7"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};
