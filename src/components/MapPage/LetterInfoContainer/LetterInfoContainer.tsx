import React from 'react';

interface LetterInfoContainerProps {
    title: string;
    keyword: string;
    date: string;
    clickEvent: () => void;
}

export const LetterInfoContainer = ({
    title,
    keyword,
    date,
    clickEvent
}: LetterInfoContainerProps) => {
    return (
        <div className="flex flex-col w-[330px] bg-gray-200 rounded-lg p-4 shadow-md">
            <div className="flex gap-4 mb-4">
                <div className="p-2 bg-gray-300 rounded-md">
                    <img src="/bottle.png" alt="Bottle" className="w-20 h-20" />
                </div>
                <div className="flex flex-col justify-between h-20">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-sm text-gray-600">키워드: {keyword}</p>
                    <p className="text-sm text-gray-600">작성일: {date}</p>
                </div>
            </div>

            <button
                className="w-full py-2 text-center text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={clickEvent}
            >
                편지 보러가기
            </button>
        </div>
    );
};
