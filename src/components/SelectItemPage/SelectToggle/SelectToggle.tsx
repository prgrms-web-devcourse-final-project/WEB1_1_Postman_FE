import React from 'react';

type SelectToggleProps = {
    isLabel: boolean;
    setIsLabel: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SelectToggle: React.FC<SelectToggleProps> = ({
    isLabel,
    setIsLabel
}) => {
    return (
        <div className="relative flex w-full overflow-hidden text-xl align-middle h-[50px] ">
            <div
                className="absolute bottom-0 w-1/2 h-[2px] transition-transform duration-500 ease-in-out bg-sample-blue"
                style={{
                    transform: `translateX(${isLabel ? '0%' : '100%'})`
                }}
            ></div>
            <div
                className="flex items-center justify-center flex-1 h-full cursor-pointer"
                onClick={() => setIsLabel(true)}
            >
                <span>라벨</span>
            </div>
            <div
                className="flex items-center justify-center flex-1 h-full cursor-pointer"
                onClick={() => setIsLabel(false)}
            >
                <span>키워드</span>
            </div>
        </div>
    );
};
