import React from 'react';
import { LabelProps } from '@/types/label';
import { Label } from '@/components/Common/BottleLetter/Label/Label';

type LableListProps = {
    labels: LabelProps[];
    selectedLabels: number[];
    onLabelSelect: (index: number) => void;
};

export const LabelList = ({
    labels,
    selectedLabels,
    onLabelSelect
}: LableListProps) => {
    return (
        <div className="grid grid-cols-4 gap-4 mt-5">
            {labels.map((label, idx) => (
                <div
                    key={idx}
                    className="w-20 mx-auto cursor-pointer"
                    onClick={() => onLabelSelect(idx)}
                >
                    <Label
                        imgSrc={label.imgSrc}
                        isActive={selectedLabels.includes(idx)}
                    />
                </div>
            ))}
        </div>
    );
};
