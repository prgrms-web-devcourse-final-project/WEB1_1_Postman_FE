import React, { useState } from 'react';
// import { getUserLabel } from './../../service/label/get/getUserLabel';
// import { useQuery } from '@tanstack/react-query';
import { LabelType } from '@/types/label';
import { Itembox } from '@/components/Common/Itembox/Itembox';
import { Label } from '@/components/Common/BottleLetter/Label/Label';
import { Link } from 'react-router-dom';
import { useModal } from '@/hooks/useModal';
import { Margin } from '@/components/Common/Margin/Margin';
import { BackButtonCotainer } from '@/components/Common/BackButtonContainer/BackButtonCotainer';

const testLable: LabelType[] = [
    { labelId: 1, imageUrl: '/라벨_샘플_1.png' },
    { labelId: 2, imageUrl: '/라벨_샘플_2.png' },
    { labelId: 3, imageUrl: '/라벨_샘플_3.png' },
    { labelId: 4, imageUrl: '/라벨_샘플_4.png' },
    { labelId: 5, imageUrl: '/라벨_샘플_5.png' },
    { labelId: 6, imageUrl: '/라벨_샘플_6.png' },
    { labelId: 7, imageUrl: '/라벨_샘플_1.png' },
    { labelId: 8, imageUrl: '/라벨_샘플_2.png' },
    { labelId: 9, imageUrl: '/라벨_샘플_3.png' },
    { labelId: 10, imageUrl: '/라벨_샘플_4.png' },
    { labelId: 11, imageUrl: '/라벨_샘플_5.png' },
    { labelId: 12, imageUrl: '/라벨_샘플_6.png' },
    { labelId: 13, imageUrl: '/라벨_샘플_1.png' },
    { labelId: 14, imageUrl: '/라벨_샘플_2.png' },
    { labelId: 15, imageUrl: '/라벨_샘플_3.png' },
    { labelId: 16, imageUrl: '/라벨_샘플_4.png' },
    { labelId: 17, imageUrl: '/라벨_샘플_5.png' },
    { labelId: 18, imageUrl: '/라벨_샘플_6.png' },
    { labelId: 19, imageUrl: '/라벨_샘플_1.png' },
    { labelId: 20, imageUrl: '/라벨_샘플_2.png' },
    { labelId: 21, imageUrl: '/라벨_샘플_3.png' },
    { labelId: 22, imageUrl: '/라벨_샘플_4.png' },
    { labelId: 23, imageUrl: '/라벨_샘플_5.png' },
    { labelId: 24, imageUrl: '/라벨_샘플_6.png' }
];

export const LabelCollectionsPage = () => {
    const { openModal, closeModal, ModalComponent } = useModal();
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
            <div className="flex flex-row sticky top-0 z-10 pt-2 bg-white w-full">
                <BackButtonCotainer width="30px" />
                <h3 className="text-lg font-bold">라벨 모음</h3>
            </div>
            <ModalComponent height="w-[250px]">
                <div className="flex flex-col justify-center items-center">
                    {selectedLabel && (
                        <div className="h-full">
                            <Label imgSrc={selectedLabel.imageUrl} />
                        </div>
                    )}
                    <div onClick={closeModal} className="cursor-pointer">
                        닫기
                    </div>
                </div>
            </ModalComponent>
            <div className="flex flex-col gap-5">{renderList()}</div>
            <Link to="/lottery">
                <button className="fixed bottom-[6rem] w-[calc(100%-3rem)] max-w-[425px] btn-base bg-sample-blue text-white h-[50px] flex items-center justify-center rounded-lg shadow-lg">
                    라벨 더 뽑으러 가기
                </button>
            </Link>
            <Margin bottom={60} />
        </div>
    );
};
