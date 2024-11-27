import React from 'react';
import { Link } from 'react-router-dom';

export const RecordGridSection = () => {
    const recordStyle = `w-full bg-gray-100 rounded-xl px-4 py-2 h-[110px]`;
    const wideRecordStyle = `w-full bg-gray-100 rounded-xl px-4 py-2 h-[110px]`;

    return (
        <div className="flex flex-col gap-2">
            <h2 className="font-bold text-gray-400">내 기록</h2>
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                <div className="col-span-1">
                    <Link to="/mypage/letters/keyword" className="block">
                        <div className={recordStyle}>키워드 편지함</div>
                    </Link>
                </div>
                <div className="col-span-1">
                    <Link to="/mypage/letters/map" className="block">
                        <div className={recordStyle}>지도 편지함</div>
                    </Link>
                </div>
                <div className="col-span-2">
                    <Link to="/mypage/labels" className="block">
                        <div className={wideRecordStyle}>라벨첩</div>
                    </Link>
                </div>
            </div>
        </div>
    );
};
