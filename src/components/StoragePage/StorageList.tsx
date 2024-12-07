import React, { useEffect, useState } from 'react';
import { BottleLetter } from '../Common/BottleLetter/BottleLetter';
import { Itembox } from '../Common/Itembox/Itembox';
import { getLetter } from '@/service/storage/getLetter';
import { useNavigate } from 'react-router-dom';

interface Letter {
    letterId: number;
    title: string;
    label: string;
    letterType: string;
    boxType: string;
    createdAt: string;
}

interface DayGroup {
    date: string;
    letters: Letter[];
}

type storageType = 'keyword' | 'map' | 'bookmark';
type FilterType = 'LETTER' | 'REPLY_LETTER';

type StorageListProps = {
    type: storageType;
};

export const StorageList = ({ type = 'keyword' }: StorageListProps) => {
    const navigate = useNavigate();

    // const queryClient = useQueryClient();
    // const { data, error, fetchNextPage, hasNextPage, isFetchNextPage } =
    //     useInfiniteFetch();
    const page = 1;
    const size = 10;
    const [selectedFilter, setSelectedFilter] = useState<FilterType>('LETTER');
    const [checkedItems, setCheckedItems] = useState<number[]>([]);
    const [groupedLetters, setGroupedLetters] = useState<DayGroup[]>([]);

    // 리스트 타입 - 필터별 엔드포인트 추출
    const getApiEndpoint = (type: storageType, filter: FilterType) => {
        const endpoints = {
            keyword: {
                LETTER: '/letters/saved/sent',
                REPLY_LETTER: '/letters/saved/received'
            },
            map: {
                LETTER: '/map/sent',
                REPLY_LETTER: '/map/received'
            },
            bookmark: '/map/archived'
        };

        if (type === 'bookmark') {
            return endpoints[type];
        }

        return endpoints[type]?.[filter];
    };

    // 데이터 패치
    // 따로 필터링 해줄 필요 없이 엔드포인트가 다르게 들어감
    const getLetterList = async () => {
        const apiEndpoint = getApiEndpoint(type, selectedFilter);
        const response = await getLetter({ apiEndpoint, page, size });
        console.log('응답:', response);
        if (response.isSuccess) {
            return response.result.content;
        }
        return [];
    };

    // 편지 리스트를 날짜별로 그룹화, 날짜순으로 정렬
    const groupLettersByDate = (letters: Letter[]): DayGroup[] => {
        const grouped = letters.reduce(
            (acc: { [key: string]: Letter[] }, letter) => {
                const date = new Date(letter.createdAt)
                    .toISOString()
                    .split('T')[0];

                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push(letter);
                return acc;
            },
            {}
        );
        return Object.entries(grouped)
            .map(([date, letters]) => ({
                date,
                letters: letters.sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                )
            }))
            .sort(
                (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
            );
    };

    const setData = async () => {
        const letters = await getLetterList();
        setGroupedLetters(groupLettersByDate(letters));
    };

    // 체크박스 단일 클릭
    const handleSingleCheck = (checked: boolean, id: number) => {
        if (checked) {
            setCheckedItems((prev) => [...prev, id]);
        } else {
            setCheckedItems(checkedItems.filter((el) => el !== id));
        }
    };

    // 체크박스 전체 클릭
    const handleAllCheck = (checked: boolean) => {
        if (checked) {
            const idArray: number[] = [];
            groupedLetters.forEach((item) => {
                item.letters.forEach((letter) => {
                    idArray.push(letter.letterId);
                });
            });
            setCheckedItems(idArray);
        } else {
            setCheckedItems([]);
        }
    };

    // 테스트 출력
    useEffect(() => {
        console.log(checkedItems);
    }, [checkedItems]);

    // 테스트 데이터 세팅?
    useEffect(() => {
        setData();
    }, [type, selectedFilter]);

    const renderList = () => {
        return (
            <div className="flex flex-col gap-2 mt-2">
                <div className="flex flex-row gap-2">
                    <button
                        className={`border border-sample-blue rounded-xl text-sm px-2 py-1
                                ${
                                    selectedFilter === 'LETTER'
                                        ? 'bg-sample-blue text-white'
                                        : 'bg-white text-sample-blue'
                                }`}
                        onClick={() => setSelectedFilter('LETTER')}
                    >
                        보낸 편지
                    </button>
                    <button
                        className={`border border-sample-blue rounded-xl text-sm px-2 py-1
                                ${
                                    selectedFilter === 'REPLY_LETTER'
                                        ? 'bg-sample-blue text-white'
                                        : 'bg-white text-sample-blue'
                                }`}
                        onClick={() => setSelectedFilter('REPLY_LETTER')}
                    >
                        받은 편지
                    </button>
                </div>
                {/* 삭제 섹션 */}
                <div className="flex flex-row justify-between w-full gap-3 text-sm">
                    <div className="flex flex-row items-center gap-1">
                        <input
                            type="checkbox"
                            name="select-all"
                            onChange={(e) => handleAllCheck(e.target.checked)}
                            checked={
                                checkedItems.length ===
                                groupedLetters.reduce(
                                    (acc, day) => acc + day.letters.length,
                                    0
                                )
                            }
                        />
                        <label>전체</label>
                    </div>
                    <button className="px-2 py-1 bg-sample-gray">삭제</button>
                </div>
                {groupedLetters.map((dayGroup) => (
                    <div key={dayGroup.date} className="flex flex-col gap-3">
                        {/* 날짜 섹션 */}
                        <div className="font-medium text-md">
                            {dayGroup.date}
                        </div>
                        {/* 해당 날짜의 편지들 */}
                        <div className="flex flex-col gap-2">
                            {dayGroup.letters.map((letter) => (
                                <div
                                    key={letter.letterId}
                                    className="flex flex-row gap-2"
                                >
                                    <input
                                        type="checkbox"
                                        name={`select-${letter.letterId}`}
                                        onChange={(e) =>
                                            handleSingleCheck(
                                                e.target.checked,
                                                letter.letterId
                                            )
                                        }
                                        checked={
                                            checkedItems.includes(
                                                letter.letterId
                                            )
                                                ? true
                                                : false
                                        }
                                    />
                                    <div
                                        className="flex flex-row gap-4 w-full h-[90px] items-center p-4 rounded-lg bg-sample-gray cursor-pointer"
                                        onClick={() => {
                                            if (
                                                type === 'keyword' ||
                                                type === 'map'
                                            ) {
                                                const dataType =
                                                    selectedFilter === 'LETTER'
                                                        ? 'sent'
                                                        : 'received';
                                                navigate(
                                                    `/letter/${type}/${dataType}/${letter.letterId}`
                                                );
                                            }
                                        }}
                                    >
                                        <Itembox>
                                            <BottleLetter Letter={letter} />
                                        </Itembox>
                                        <div className="flex flex-col h-full">
                                            <div className="text-[12px] text-gray-500 mt-2">
                                                {letter.letterType === 'LETTER'
                                                    ? '보낸 편지'
                                                    : '받은 편지'}
                                            </div>
                                            <h3 className="text-sm font-bold">
                                                {letter.title}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return <div className="">{renderList()}</div>;
};
