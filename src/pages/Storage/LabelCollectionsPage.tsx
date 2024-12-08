import React, { useState } from 'react';
import { getUserLabel } from './../../service/label/get/getUserLabel';
import { useQuery } from '@tanstack/react-query';
import { LabelType } from '@/types/label';
import { Itembox } from '@/components/Common/Itembox/Itembox';
import { Label } from '@/components/Common/BottleLetter/Label/Label';
import { Link } from 'react-router-dom';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/components/Common/Modal/Modal';

const testLable: LabelType[] = [
    { labelId: 1, imageUrl: '/라벨_샘플_01.png' },
    { labelId: 2, imageUrl: '/라벨_샘플_02.png' },
    { labelId: 3, imageUrl: '/라벨_샘플_01.png' },
    { labelId: 4, imageUrl: '/라벨_샘플_02.png' },
    { labelId: 5, imageUrl: '/라벨_샘플_01.png' }
];

export const LabelCollectionsPage = () => {
    const { openModal, ModalComponent } = useModal();
    const [selectedLabel, setSelectedLabel] = useState<LabelType | null>(null);

    const handleItemClick = (item: LabelType) => {
        setSelectedLabel(item);
        openModal();
    };

    // const { data, isLoading, isError } = useQuery({
    //     queryKey: ['userLabel'],
    //     queryFn: getUserLabel,
    //     retry: 1
    // });

    const renderList = () => {
        // if (isLoading) return <div>로딩중...</div>;
        // if (isError) return <div>에러</div>;
        // if (data.isSuccess) {
        //     return (
        //         <div className="">
        //             {testLable.result.map((item, index) => {
        //                 return (
        //                     <div key={item.labelId + { index }}>
        //                         {item.imageUrl}
        //                     </div>
        //                 );
        //             })}
        //         </div>
        //     );
        // }
        // 테스트 라벨 데이터 바인딩
        return (
            <div className="grid grid-cols-4 gap-4 w-full">
                {testLable.map((item, index) => {
                    return (
                        <Itembox
                            key={item.labelId + index}
                            width="auto"
                            height="auto"
                            onClick={() => handleItemClick(item)}
                        >
                            <Label imgSrc={item.imageUrl} />
                        </Itembox>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="h-full flex flex-col justify-between">
            <ModalComponent height="h-[400px]">
                {selectedLabel && (
                    <div className="h-full">
                        <Label imgSrc={selectedLabel.imageUrl} />
                    </div>
                )}
            </ModalComponent>
            <div className="flex flex-col gap-5">
                <h3 className="text-lg font-bold">라벨 모음</h3>
                {renderList()}
            </div>
            <Link to="/lottery">
                <button className="btn-base bg-sample-blue text-white h-[50px] flex items-center justify-center">
                    라벨 더 뽑으러 가기
                </button>
            </Link>
        </div>
    );
};
