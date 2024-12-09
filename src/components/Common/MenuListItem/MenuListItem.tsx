import React from 'react';
import { Link } from 'react-router-dom';

type MenuListItemProps = {
    navigationUrl: string;
    content: string;
    onClick?: () => void;
};

export const MenuListItem = ({ content, onClick }: MenuListItemProps) => {
    return (
        <div
            className="w-full h-[50px] flex flex-row justify-between items-center cursor-pointer"
            onClick={onClick}
        >
            <div className="text-sample-black">{content}</div>
            <svg className="w-5 h-5" viewBox="0 0 28 28" fill="none">
                <path
                    d="M16.1004 21.7L8.61252 14.2122C8.49537 14.095 8.49537 13.9051 8.61252 13.7879L16.1004 6.30005"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    transform="rotate(180 14 14)"
                ></path>
            </svg>
        </div>
    );
};
