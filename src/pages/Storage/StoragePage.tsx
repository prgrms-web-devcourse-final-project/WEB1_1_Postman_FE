import React, { useEffect } from 'react';
import { StorageList } from '@/components/StoragePage/StorageList';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

type LetterType = 'keyword' | 'map' | 'bookmark';

const getTranslateX = (path: LetterType) => {
    const pathIndex =
        {
            keyword: 0,
            map: 1,
            bookmark: 2
        }[path] || 0;

    return `${pathIndex * 100}%`;
};

export const StoragePage = () => {
    const navigate = useNavigate();
    const { letterType } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleNavigate = (type: LetterType) => {
        if (type === 'bookmark') return navigate(`/storage/${type}`);
        navigate(`/storage/${type}?filtertype=sent`);
    };

    // 마운트 될 때 초기 필터타입을 지정합니다
    useEffect(() => {
        if (letterType === 'bookmark') return;
        const currentFilter = searchParams.get('filtertype');
        if (!currentFilter) {
            setSearchParams({ filtertype: 'sent' });
        }
    }, []);

    return (
        <div className="flex flex-col h-full">
            <div className="sticky top-0 bg-white z-10">
                <div className="relative flex w-full overflow-hidden text-md align-middle h-[50px] text-sample-black ">
                    <div
                        className="absolute bottom-0 w-1/3 h-[2px] transition-transform duration-500 ease-in-out bg-sample-blue"
                        style={{
                            transform: `translateX(${getTranslateX(letterType as LetterType)})`
                        }}
                    ></div>
                    <div
                        className="flex items-center justify-center flex-1 h-full cursor-pointer"
                        onClick={() => handleNavigate('keyword')}
                    >
                        <span>키워드 편지</span>
                    </div>
                    <div
                        className="flex items-center justify-center flex-1 h-full cursor-pointer"
                        onClick={() => handleNavigate('map')}
                    >
                        <span>내 지도 편지</span>
                    </div>
                    <div
                        className="flex items-center justify-center flex-1 h-full cursor-pointer"
                        onClick={() => handleNavigate('bookmark')}
                    >
                        <span>보관한 지도 편지</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2 mt-[15px]">
                <StorageList />
            </div>
        </div>
    );
};
