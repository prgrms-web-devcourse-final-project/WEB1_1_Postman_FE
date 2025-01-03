import React, { useEffect } from 'react';
import { StorageList } from '@/components/StoragePage/StorageList';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

export const StoragePage = () => {
    const navigate = useNavigate();
    const { selectedLetterType } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const storageMenuList = [
        {
            type: 'keyword',
            label: '키워드 편지'
        },
        {
            type: 'map',
            label: '지도 편지'
        },
        {
            type: 'bookmark',
            label: '보관함'
        }
    ];

    const getTranslateX = (path: string) => {
        const pathIndex =
            {
                keyword: 0,
                map: 1,
                bookmark: 2
            }[path] || 0;

        return `${pathIndex * 100}%`;
    };

    const handleNavigate = (type: string) => {
        if (type === 'bookmark') return navigate(`/storage/${type}`);
        navigate(`/storage/${type}?filtertype=sent`);
    };

    useEffect(() => {
        if (selectedLetterType === 'bookmark') return;
        const currentFilter = searchParams.get('filtertype');
        if (!currentFilter) {
            setSearchParams({ filtertype: 'sent' });
        }
    }, []);

    return (
        <div className="flex flex-col h-full">
            <div className="max-w-[473px] fixed min-w-[375px] w-full top-0 z-[9999] bg-white -ml-5">
                <div className="relative flex w-full overflow-hidden text-md align-middle h-[50px] text-sample-black">
                    <div
                        className="absolute bottom-0 w-1/3 h-[2px] transition-transform duration-500 ease-in-out bg-sample-blue"
                        style={{
                            transform: `translateX(${getTranslateX(selectedLetterType as string)})`
                        }}
                    ></div>
                    {storageMenuList.map((category) => {
                        return (
                            <div
                                key={category.type}
                                className="flex items-center justify-center flex-1 h-full cursor-pointer"
                                onClick={() => handleNavigate(category.type)}
                            >
                                <span>{category.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="flex flex-col gap-2 mt-[60px]">
                <StorageList />
            </div>
        </div>
    );
};
