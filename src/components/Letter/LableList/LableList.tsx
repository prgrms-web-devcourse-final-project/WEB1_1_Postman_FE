import React from 'react';
import { LabelProps } from '@/types/lable';
import { Label } from '@/components/Common/BottleLetter/Label/Label';

type LableListProps = {
    LableList: LabelProps[];
};

export const LableList = ({ LableList }: LableListProps) => {
    return (
        <div className="grid grid-cols-4 gap-4 mt-5">
            {LableList.map((val, idx) => (
                <div key={idx} className="w-20 mx-auto mr-auto">
                    <Label imgSrc={val.imgSrc} />
                </div>
            ))}
        </div>
    );
};
