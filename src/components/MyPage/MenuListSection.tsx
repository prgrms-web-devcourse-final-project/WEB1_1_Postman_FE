import React from 'react';
import { MenuListItem } from '../Common/MenuListItem/MenuListItem';

type MenuListItemType = {
    content: string;
    url: string;
};

type MenuListSectionProps = {
    menuItems: MenuListItemType[];
};

export const MenuListSection = ({ menuItems }: MenuListSectionProps) => {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="font-bold text-sample-black">내 편지함</h2>
            <div className="w-full">
                {menuItems.map((item, index) => {
                    return (
                        <div key={item.content + index}>
                            <MenuListItem
                                content={item.content}
                                navigationUrl={item.url}
                            />
                            {index < menuItems.length - 1 && (
                                <div className="w-full h-[1px] bg-gray-200" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
