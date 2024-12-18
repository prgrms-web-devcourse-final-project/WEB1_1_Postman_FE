import React, { useState } from 'react';
import { StorageList } from '@/components/StoragePage/StorageList';
import { useSearchParams } from 'react-router-dom';

type storageType = 'keyword' | 'map' | 'bookmark';

interface StoragePageProps {
    initialType?: storageType;
}

const getTranslateX = (path: storageType) => {
    const pathIndex =
        {
            keyword: 0,
            map: 1,
            bookmark: 2
        }[path] || 0;

    return `${pathIndex * 100}%`;
};

export const StoragePage = ({ initialType }: StoragePageProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [storageType, setStorageType] = useState<storageType>(
        (searchParams.get('type') as storageType) || initialType || 'keyword'
    );

    const handleTypeChange = (type: storageType) => {
        setStorageType(type);
        setSearchParams({ type });
    };

    return (
        <div className="flex flex-col h-full">
            <div className="sticky top-0 bg-white z-10">
                <div className="relative flex w-full overflow-hidden text-md align-middle h-[50px] text-sample-black ">
                    <div
                        className="absolute bottom-0 w-1/3 h-[2px] transition-transform duration-500 ease-in-out bg-sample-blue"
                        style={{
                            transform: `translateX(${getTranslateX(storageType)})`
                        }}
                    ></div>
                    <div
                        className="flex items-center justify-center flex-1 h-full cursor-pointer"
                        onClick={() => handleTypeChange('keyword')}
                    >
                        <span>키워드 편지</span>
                    </div>
                    <div
                        className="flex items-center justify-center flex-1 h-full cursor-pointer"
                        onClick={() => handleTypeChange('map')}
                    >
                        <span>내 지도 편지</span>
                    </div>
                    <div
                        className="flex items-center justify-center flex-1 h-full cursor-pointer"
                        onClick={() => handleTypeChange('bookmark')}
                    >
                        <span>보관한 지도 편지</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2 mt-[15px]">
                <StorageList type={storageType} />
            </div>
        </div>
    );
};
