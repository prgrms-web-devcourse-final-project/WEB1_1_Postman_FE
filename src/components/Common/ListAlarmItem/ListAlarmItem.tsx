import React from 'react';

type ListAlarmItemProps = {
    image?: string;
    title?: string;
    contents?: string;
};

export const ListAlarmItem = ({
    image = 'https://i.postimg.cc/MHYqzbTg/3.png',
    title = '알림',
    contents = '알림 내용입니다.'
}: ListAlarmItemProps) => {
    const content = (
        <div className="flex w-[100%] items-center">
            <span className="flex gap-6 items-center">
                {image && (
                    <img
                        src={image}
                        alt="icon"
                        className="w-[60px] h-[60px] rounded-full object-cover"
                    />
                )}
                <div className="flex-col">
                    <div>{title}</div>
                    <div>{contents}</div>
                </div>
            </span>
        </div>
    );

    return (
        <div className="w-[100%] bg-gray-100 rounded-xl flex justify-center p-6">
            {content}
        </div>
    );
};
