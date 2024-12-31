import { BottleLetter } from '@/components/Common/BottleLetter/BottleLetter';
import { NavLink } from 'react-router-dom';

type LetterInfoContainerProps = {
    letterId: number;
    title: string;
    distance: string;
    date: string;
    daysLeft: number;
    lat: number;
    lot: number;
    label: string;
};

export const LetterInfoContainer = ({
    letterId,
    title,
    distance,
    date,
    daysLeft,
    lat,
    lot,
    label
}: LetterInfoContainerProps) => {
    const limitDistance = parseFloat(distance) <= 15;
    const Letter = { label };

    return (
        <div className="flex flex-col w-[330px] bg-white border rounded-lg p-4 shadow-md">
            <div className="flex gap-4 mb-4">
                <div className="p-2 bg-gray-100 rounded-full w-20 h-20">
                    <BottleLetter Letter={Letter} />
                </div>
                <div className="flex flex-col h-20">
                    <div className="gap-2 flex items-center">
                        <p className="text-sm text-gray-600">작성일: {date}</p>
                        <div className="p-1 bg-theme-skyblue bg-opacity-30 flex-center rounded-xl">
                            <p className="text-sm font-bold text-gray-500 text-nowrap">
                                D-{daysLeft}
                            </p>
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold truncate ">{title}</h3>
                    <p className="text-sm text-gray-600">
                        현재 위치에서 {distance}m
                    </p>
                </div>
            </div>

            <NavLink
                to={`/letter/map/${lat}/${lot}/${letterId}`}
                className={`w-full py-2 text-center text-gray-700 bg-theme-skyblue rounded-lg   ${
                    limitDistance ? '' : 'cursor-not-allowed bg-gray-400'
                }`}
                aria-disabled={!limitDistance}
                onClick={(e) => !limitDistance && e.preventDefault()}
            >
                편지 보러가기
            </NavLink>
        </div>
    );
};
