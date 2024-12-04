import React, { useState } from 'react';
import { Container } from '@/components/Common/Container/Container';
import { StorageList } from '@/components/StoragePage/StorageList';

type storageType = 'keyword' | 'map' | 'bookmark';
type FilterType = 'sent' | 'received';

const getTranslateX = (path: storageType) => {
    const pathIndex =
        {
            keyword: 0,
            map: 1,
            bookmark: 2
        }[path] || 0;

    return `${pathIndex * 100}%`;
};

export const StoragePage = () => {
    const [storageType, setStorageType] = useState<storageType>('keyword');
    const [selectedFilter, setSelectedFilter] = useState<FilterType>('sent');

    const handleFilterSelect = (newFilter: FilterType) => {
        setSelectedFilter(newFilter);
    };

    return (
        <div className="">
            <div className="relative flex w-full overflow-hidden text-md align-middle h-[50px] ">
                <div
                    className="absolute bottom-0 w-1/3 h-[2px] transition-transform duration-500 ease-in-out bg-sample-blue"
                    style={{
                        transform: `translateX(${getTranslateX(storageType)})`
                    }}
                ></div>
                <div
                    className="flex items-center justify-center flex-1 h-full cursor-pointer"
                    onClick={() => setStorageType('keyword')}
                >
                    <span>키워드 편지</span>
                </div>
                <div
                    className="flex items-center justify-center flex-1 h-full cursor-pointer"
                    onClick={() => setStorageType('map')}
                >
                    <span>내 지도 편지</span>
                </div>
                <div
                    className="flex items-center justify-center flex-1 h-full cursor-pointer"
                    onClick={() => setStorageType('bookmark')}
                >
                    <span>보관한 지도 편지</span>
                </div>
            </div>
            <Container>
                <div className="flex flex-col gap-2">
                    <div>
                        <button
                            className="keyword-tag"
                            onClick={() => setSelectedFilter('sent')}
                        >
                            보낸 편지
                        </button>
                        <button
                            className="keyword-tag"
                            onClick={() => setSelectedFilter('received')}
                        >
                            받은 편지
                        </button>
                    </div>
                    <div>
                        <StorageList
                            type={storageType}
                            filter={selectedFilter}
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
};
