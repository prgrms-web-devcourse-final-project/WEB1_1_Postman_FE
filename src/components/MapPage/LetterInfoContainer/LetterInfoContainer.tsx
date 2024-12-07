import { DayCounter } from '@/components/Common/DayCounter/DayCounter';
import { NavLink } from 'react-router-dom';

type LetterInfoContainerProps = {
    letterId: number;
    title: string;
    distance: string;
    date: string;
    daysLeft: number;
    lat: number;
    lot: number;
};

export const LetterInfoContainer = ({
    letterId,
    title,
    distance,
    date,
    daysLeft,
    lat,
    lot
}: LetterInfoContainerProps) => {
    const limitDistance = parseFloat(distance) <= 15;

    return (
        <div className="flex flex-col w-[330px] bg-gray-200 rounded-lg p-4 shadow-md">
            <div className="flex gap-4 mb-4">
                <div className="p-2 bg-gray-300 rounded-md">
                    <img src="/bottle.png" alt="Bottle" className="w-20 h-20" />
                </div>
                <div className="flex flex-col h-20">
                    <div className="gap-2 flex-center">
                        <p className="text-sm text-gray-600">작성일: {date}</p>
                        <DayCounter width="40px" createdAt={String(daysLeft)} />
                    </div>

                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-sm text-gray-600">
                        현재 위치에서 {distance}m
                    </p>
                </div>
            </div>

            <NavLink
                to={`/letter/map/${lat}/${lot}/${letterId}`}
                className={`w-full py-2 text-center text-gray-700 bg-gray-300 rounded-lg ${
                    limitDistance
                        ? 'hover:bg-gray-400'
                        : 'cursor-not-allowed bg-gray-400'
                }`}
                aria-disabled={!limitDistance}
                onClick={(e) => !limitDistance && e.preventDefault()}
            >
                편지 보러가기
            </NavLink>
        </div>
    );
};
