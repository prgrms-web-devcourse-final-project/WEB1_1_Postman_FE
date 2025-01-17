import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useInfiniteStorageFetch } from '@/hooks/useInfiniteStorageFetch';
import { useQueryClient } from '@tanstack/react-query';
import { match } from 'ts-pattern';
import { deleteLetters } from '@/service/letter/delete/deleteLetters';
import { useModal, useToastStore } from '@/hooks';
import { DeleteLetterType, storageLetterType } from '@/types/letter';
import { Empty } from '@/components/Common/Empty/Empty';
import { Loading } from '@/components/Common/Loading/Loading';
import { LetterDateGroup } from './LetterDateGroup';

const ROWS_PER_PAGE = 10;

export const StorageList = () => {
    const queryClient = useQueryClient();
    const { selectedLetterType } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const filterType = searchParams.get('filtertype');
    const { ref, inView } = useInView();
    const { addToast } = useToastStore();
    const { openModal, closeModal, ModalComponent } = useModal();
    const [checkedItems, setCheckedItems] = useState<DeleteLetterType[]>([]);

    const getApiEndpoint = () => {
        return match<storageLetterType>(selectedLetterType as storageLetterType)
            .with('keyword', () => `/letters/saved/${filterType}`)
            .with('map', () => `/map/${filterType}`)
            .with('bookmark', () => '/map/archived')
            .exhaustive();
    };

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
                    <div className="flex flex-col items-center justify-center w-full h-full gap-3">
                        <div className="text-bold">정말 삭제하시겠습니까?</div>
                        <div className="flex flex-row items-center justify-center w-full gap-1">
                            <button
                                onClick={handleDelete}
                                className="px-3 py-1 text-white rounded-sm bg-sample-blue"
                            >
                                예
                            </button>
                            <button
                                onClick={closeModal}
                                className="px-3 py-1 bg-white border rounded-sm border-sample-blue text-sample-blue"
                            >
                                아니오
                            </button>
                        </div>
                    </div>
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
                    onClick={() => setSearchParams({ filtertype: 'received' })}
                >
                    받은 편지
                </button>
            </div>
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
