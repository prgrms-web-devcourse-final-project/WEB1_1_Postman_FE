import React from 'react';

export const RecordGridSection = () => {
    const recordStyle = `bg-gray-100 rounded-xl px-4 py-2 h-[110px]`;
    const wideRecordStyle = `${recordStyle} col-span-2`;

    return (
        <div className="flex flex-col gap-2">
            <h2 className="font-bold text-gray-400">내 기록</h2>
            <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
                <div className={recordStyle}>키워드 편지함</div>
                <div className={recordStyle}>지도 편지함</div>
                <div className={wideRecordStyle}>라벨첩</div>
            </div>
        </div>
    );
};
