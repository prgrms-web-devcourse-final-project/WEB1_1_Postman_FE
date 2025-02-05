import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useInfiniteStorageFetch } from '@/hooks/useInfiniteStorageFetch';
import { match } from 'ts-pattern';
import { useModal, useToastStore } from '@/hooks';
import {
    DeleteKeywordLetterType,
    StorageLetterDataType,
    storageLetterType,
    StorageMapReceivedLetter,
    StorageMapSentLetter
} from '@/types/letter';
import { Empty } from '@/components/Common/Empty/Empty';
import { Loading } from '@/components/Common/Loading/Loading';
import { LetterDateGroup } from './LetterDateGroup';
import { DeleteModal } from './DeleteModal';
import { useQueryClient } from '@tanstack/react-query';
import { deleteKeywordLetters } from '@/service/letter/delete/deleteKeywordLetters';
import { deleteMapLetters } from '@/service/letter/delete/deleteMapLetters';
import { deleteBookmarkLetters } from '@/service/letter/delete/deleteBookmarkLetters';

const ROWS_PER_PAGE = 10;

// 1. 필터 관련 로직 분리
// 2. 삭제 관련 로직 분리
// 3. 무한 스크롤 관련 로직 분리
export const StorageList = () => {
    const queryClient = useQueryClient();
    const { selectedLetterType } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const filterType = searchParams.get('filtertype');
    const { ref, inView } = useInView();
    const { addToast } = useToastStore();
    const { openModal, ModalComponent, closeModal } = useModal();
    const [checkedItems, setCheckedItems] = useState<StorageLetterDataType[]>(
        []
    );

    const getApiEndpoint = () => {
        return match<storageLetterType>(selectedLetterType as storageLetterType)
            .with('keyword', () => `/letters/saved/${filterType}`)
            .with('map', () => {
                const mapType =
                    filterType === 'received' ? 'received-target' : 'sent-map';
                return `/map/saved?type=${mapType}`;
            })
            .with('bookmark', () => '/map/archived')
            .exhaustive();
    };

    // api - 버전 2
    // const getApiEndpoint = () => {
    //     return match<storageLetterType>(selectedLetterType as storageLetterType)
    //         .with('keyword', () => `/letters/saved/${filterType}`)
    //         .with('map', () => `/map/saved?type=${filterType}-map`)
    //         .with('bookmark', () => '/map/archived')
    //         .exhaustive();
    // };

    const {
        groupedLetters,
        status,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage
    } = useInfiniteStorageFetch({
        apiEndpoint: getApiEndpoint(),
        size: ROWS_PER_PAGE
    });

    const handleSingleCheck = (
        checked: boolean,
        letter: StorageLetterDataType
    ) => {
        if (checked) {
            setCheckedItems((prev) => [...prev, letter]);
        } else {
            setCheckedItems(
                checkedItems.filter((item) => item.letterId !== letter.letterId)
            );
        }
        console.log(checkedItems);
    };

    const handleAllCheck = (checked: boolean) => {
        if (checked) {
            const itemArray = groupedLetters.flatMap((group) => group.letters);
            setCheckedItems(itemArray);
        } else {
            setCheckedItems([]);
        }
    };

    // 필터 타입마다 api가 달라서 삭제 데이터 타입만 추출합니다.
    const handleDelete = async () => {
        let response;
        switch (selectedLetterType) {
            case 'keyword': {
                const keywordPayload = checkedItems.map((item) => ({
                    letterId: item.letterId,
                    letterType: item.letterType,
                    boxType: item.boxType
                })) as DeleteKeywordLetterType[];
                response = await deleteKeywordLetters(keywordPayload);
                break;
            }
            case 'map': {
                // {
                //     "letterType": 기존 편지의 deleteType
                //     "letterId": 0
                //   }
                const mapPayload = checkedItems.map((item) => ({
                    letterId: item.letterId,
                    letterType: (
                        item as StorageMapSentLetter | StorageMapReceivedLetter
                    ).deleteType
                }));
                response = await deleteMapLetters(mapPayload);
                break;
            }
            case 'bookmark': {
                // letterId 배열 [1,2,3,4...]
                const bookmarkPayload = {
                    letterIds: checkedItems.map((item) => item.letterId)
                };
                response = await deleteBookmarkLetters(bookmarkPayload);
                break;
            }
        }

        if (response?.isSuccess) {
            addToast('삭제가 완료되었습니다.', 'success');
            handleRefresh();
            closeModal();
            return;
        }

        addToast('삭제에 실패했습니다.', 'warning');
        return;
    };

    const handleRefresh = () => {
        setCheckedItems([]);
        queryClient.invalidateQueries({
            queryKey: ['storageLetters', getApiEndpoint()]
        });
        queryClient.invalidateQueries({
            queryKey: ['recommendedLetter']
        });
        queryClient.invalidateQueries({
            queryKey: ['keywordLetterDetail']
        });
    };

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView]);

    const renderList = () => {
        if (status === 'pending') {
            return <Loading />;
        }

        if (status === 'success' && groupedLetters.length === 0) {
            return <Empty />;
        }

        return (
            <div className="">
                <ModalComponent height="h-[200px] w-[250px]">
                    <DeleteModal handleDelete={handleDelete} />
                </ModalComponent>
                {groupedLetters.map((dayGroup) => (
                    <LetterDateGroup
                        key={dayGroup.date}
                        date={dayGroup.date}
                        letters={dayGroup.letters}
                        checkedItems={checkedItems}
                        handleSingleCheck={handleSingleCheck}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-2">
            {selectedLetterType !== 'bookmark' && (
                <div className="flex flex-row gap-2">
                    <button
                        className={`border border-sample-blue rounded-xl text-sm px-2 py-1
                        ${
                            filterType === 'sent'
                                ? 'bg-sample-blue text-white'
                                : 'bg-white text-sample-blue'
                        }`}
                        onClick={() => setSearchParams({ filtertype: 'sent' })}
                    >
                        보낸 편지
                    </button>
                    <button
                        className={`border border-sample-blue rounded-xl text-sm px-2 py-1
                        ${
                            filterType === 'received'
                                ? 'bg-sample-blue text-white'
                                : 'bg-white text-sample-blue'
                        }`}
                        onClick={() =>
                            setSearchParams({ filtertype: 'received' })
                        }
                    >
                        받은 편지
                    </button>
                </div>
            )}
            {groupedLetters.length === 0 ? null : (
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
                        onClick={() => {
                            if (checkedItems.length === 0) {
                                addToast('삭제할 편지가 없어요.', 'warning');
                                return;
                            }
                            openModal();
                        }}
                    >
                        삭제
                    </button>
                </div>
            )}
            <div>
                {renderList()}
                {isFetchingNextPage ? (
                    <div>패치중</div>
                ) : hasNextPage ? (
                    <div ref={ref} />
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
};
