import React, { useState } from 'react';
// import { getUserLabel } from './../../service/label/get/getUserLabel';
// import { useQuery } from '@tanstack/react-query';
import { LabelType } from '@/types/label';
import { Itembox } from '@/components/Common/Itembox/Itembox';
import { Label } from '@/components/Common/BottleLetter/Label/Label';
import { Link, useNavigate } from 'react-router-dom';
import { useModal } from '@/hooks/useModal';
import { Margin } from '@/components/Common/Margin/Margin';
import { BackButtonCotainer } from '@/components/Common/BackButtonContainer/BackButtonCotainer';
import { getUserLabel } from '@/service/label/get/getUserLabel';
import { useQuery } from '@tanstack/react-query';

export const LabelCollectionsPage = () => {
    const { openModal, closeModal, ModalComponent } = useModal();
    const navigate = useNavigate();
    const {
        data: userLabelList,
        isLoading,
        error
    } = useQuery({
        queryKey: ['userLabels'],
        queryFn: getUserLabel,
        retry: false,
        select: (data) => data.result
    });
    const [selectedLabel, setSelectedLabel] = useState<LabelType | null>(null);

    const handleItemClick = (item: LabelType) => {
        setSelectedLabel(item);
        openModal();
    };

    const renderList = () => {
        if (isLoading) return <div>로딩중...</div>;
        if (
            !userLabelList ||
            (error && 'code' in error && error.code === 'LABEL4002')
        ) {
            console.log(error);
            return (
                <div className=" flex flex-col items-center justify-center mt-[35%] gap-2">
                    <h1 className="text-5xl font-bold mb-4 text-sample-blue">
                        텅
                    </h1>
                    <div className="text-xl font-semibold text-gray-700 text-center">
                        아직 보유한 라벨이 없어요.
                    </div>
                    <button
                        className="mt-2 px-4 py-2 bg-sample-blue text-white rounded-md"
                        onClick={() => navigate('/lottery')}
                    >
                        라벨 뽑으러 가기
                    </button>
                </div>
            );
        }
        return (
            <div className="grid grid-cols-4 gap-4 w-full">
                {userLabelList.map((item, index) => {
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
