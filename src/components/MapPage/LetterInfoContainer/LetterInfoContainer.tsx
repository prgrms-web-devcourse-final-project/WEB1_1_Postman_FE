import { DayCounter } from '@/components/Common/DayCounter/DayCounter';
import React from 'react';
import { NavLink } from 'react-router-dom';

interface LetterInfoContainerProps {
    id: number;
    title: string;
    distance: string;
    date: string;
    daysLeft: number;
}

export const LetterInfoContainer = ({
    id,
    title,
    distance,
    date,
    daysLeft
}: LetterInfoContainerProps) => {
    return (
        <div className="flex flex-col w-[330px] bg-gray-200 rounded-lg p-4 shadow-md">
            <div className="flex gap-4 mb-4">
                <div className="p-2 bg-gray-300 rounded-md">
                    <img src="/bottle.png" alt="Bottle" className="w-20 h-20" />
                </div>
                <div className="flex flex-col h-20">
                    <div className="flex-center gap-2">
                        <p className="text-sm text-gray-600">작성일: {date}</p>
                        <DayCounter width="40px" daysLeft={daysLeft} />
                    </div>

                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-sm text-gray-600">
                        현재 위치에서 {distance}m
                    </p>
                </div>
            </div>

            <NavLink
                to={`/letter/map/:${id}`}
                className="w-full py-2 text-center text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
                편지 보러가기
            </NavLink>
        </div>
    );
};
