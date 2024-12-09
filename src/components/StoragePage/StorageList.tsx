import React, { useEffect, useState } from 'react';
import { BottleLetter } from '../Common/BottleLetter/BottleLetter';
import { Itembox } from '../Common/Itembox/Itembox';
import { useNavigate } from 'react-router-dom';
import { useInfiniteStorageFetch } from '@/hooks/useInfiniteStorageFetch';
import { useInView } from 'react-intersection-observer';
import { deleteLetters } from '@/service/letter/delete/deleteLetters';
import { useModal, useToastStore } from '@/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { Empty } from '../Common/Empty/Empty';
import { Loading } from '../Common/Loading/Loading';

type storageType = 'keyword' | 'map' | 'bookmark';
type FilterType = 'SEND' | 'RECEIVE';

type StorageListProps = {
    type: storageType;
};

type DeleteLetterType = {
    letterId: number;
    letterType: string;
    boxType: string;
};

const ROWS_PER_PAGE = 5;

export const StorageList = ({ type }: StorageListProps) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { openModal, closeModal, ModalComponent } = useModal();
    const { addToast } = useToastStore();

    const [selectedFilter, setSelectedFilter] = useState<FilterType>('SEND');
    const [checkedItems, setCheckedItems] = useState<DeleteLetterType[]>([]);

    const { ref, inView } = useInView();

    const getApiEndpoint = () => {
        const endpoints = {
            keyword: {
                SEND: '/letters/saved/sent',
                RECEIVE: '/letters/saved/received'
            },
            map: {
                SEND: '/map/sent',
                RECEIVE: '/map/received'
            },
            bookmark: '/map/archived'
        };

        if (type === 'bookmark') {
            return endpoints[type];
        }

        return endpoints[type]?.[selectedFilter];
    };

    const renderCategory = (boxType: string, letterType: string) => {
        const condition = `${boxType}-${letterType}`;
        switch (condition) {
            case 'SEND-LETTER':
                return '보낸 편지';
            case 'SEND-REPLY_LETTER':
                return '보낸 답장';
            case 'RECEIVE-LETTER':
                return '받은 편지';
            case 'RECEIVE-REPLY_LETTER':
                return '받은 답장';
            default:
        }
    };

    const {
        groupedLetters,
        isLoading,
        isError,
        fetchNextPage,
        isFetchingNextPage
    } = useInfiniteStorageFetch(getApiEndpoint(), ROWS_PER_PAGE);

    useEffect(() => {
        console.log(groupedLetters, isLoading, isError);
    }, [groupedLetters, isLoading, isError]);

    // 체크박스 단일 클릭
    const handleSingleCheck = (
        checked: boolean,
        { letterId, letterType, boxType }: DeleteLetterType
    ) => {
        if (checked) {
            setCheckedItems((prev) => [
                ...prev,
                { letterId, letterType, boxType }
            ]);
        } else {
            setCheckedItems(
                checkedItems.filter((item) => item.letterId !== letterId)
            );
        }
        console.log(checkedItems);
    };

    // 체크박스 전체 클릭
    const handleAllCheck = (checked: boolean) => {
        if (checked) {
            const itemArray: {
                letterId: number;
                letterType: string;
                boxType: string;
            }[] = [];
            groupedLetters.forEach((item) => {
                item.letters.forEach((letter) => {
                    itemArray.push({
                        letterId: letter.letterId,
                        letterType: letter.letterType,
                        boxType: letter.boxType
                    });
                });
            });
            setCheckedItems(itemArray);
        } else {
            setCheckedItems([]);
        }
    };

    const handleDelete = async () => {
        const response = await deleteLetters(checkedItems);
        if (response.isSuccess) {
            addToast('삭제가 완료되었습니다.', 'success');
            setCheckedItems([]);
            queryClient.invalidateQueries({
                queryKey: ['storageLetters', getApiEndpoint()]
            });
            return;
        }
        addToast('삭제에 실패했습니다.', 'warning');
        return;
    };

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView]);

    if (isLoading) {
        return <Loading />;
    }

    if (groupedLetters.length === 0) {
        return <Empty />;
    }

    const renderList = () => {
        return (
            <div className="flex flex-col gap-2">
                <ModalComponent height="h-[100px]">
                    <div className="flex flex-col gqp-3">
                        <div className="text-lg text-bold">
                            정말 삭제하시겠습니까?
                        </div>
                        <div className="flex flex-row gap-1">
                            <button
                                onClick={handleDelete}
                                className="bg-sample-blue text-white"
                            >
                                예
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-white boder border-sample-blue"
                            >
                                아니오
                            </button>
                        </div>
                    </div>
                </ModalComponent>
                <div className="flex flex-row gap-2">
                    <button
                        className={`border border-sample-blue rounded-xl text-sm px-2 py-1
                                ${
                                    selectedFilter === 'SEND'
                                        ? 'bg-sample-blue text-white'
                                        : 'bg-white text-sample-blue'
                                }`}
                        onClick={() => setSelectedFilter('SEND')}
                    >
                        보낸 편지
                    </button>
                    <button
                        className={`border border-sample-blue rounded-xl text-sm px-2 py-1
                                ${
                                    selectedFilter === 'RECEIVE'
                                        ? 'bg-sample-blue text-white'
                                        : 'bg-white text-sample-blue'
                                }`}
                        onClick={() => setSelectedFilter('RECEIVE')}
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
                    <button
                        className="px-2 py-1 bg-sample-gray"
                        onClick={openModal}
                    >
                        삭제
                    </button>
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
                                                {
                                                    letterId: letter.letterId,
                                                    letterType:
                                                        letter.letterType,
                                                    boxType: letter.boxType
                                                }
                                            )
                                        }
                                        checked={checkedItems.some(
                                            (item) =>
                                                item.letterId ===
                                                letter.letterId
                                        )}
                                    />
                                    <div
                                        className="flex flex-row gap-4 w-full h-[90px] items-center p-4 rounded-lg bg-sample-gray cursor-pointer"
                                        onClick={() => {
                                            if (
                                                type === 'keyword' ||
                                                type === 'map'
                                            ) {
                                                const dataType =
                                                    selectedFilter === 'SEND'
                                                        ? 'sent'
                                                        : 'received';
                                                const letterTypePath =
                                                    type === 'keyword'
                                                        ? `/${letter.letterType}`
                                                        : '';
                                                navigate(
                                                    `/letter/${type}${letterTypePath}/${dataType}/${letter.letterId}`
                                                );
                                            }
                                        }}
                                    >
                                        <Itembox>
                                            <BottleLetter Letter={letter} />
                                        </Itembox>
                                        <div className="flex flex-col h-full">
                                            <div className="text-[12px] text-gray-500 mt-2">
                                                {renderCategory(
                                                    letter.boxType,
                                                    letter.letterType
                                                )}
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

    return (
        <div className="">
            {renderList()}
            <div>{isFetchingNextPage ? <div></div> : <div ref={ref} />}</div>
        </div>
    );
};
