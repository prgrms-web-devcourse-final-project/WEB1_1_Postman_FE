import { Margin } from '@/components/Common/Margin/Margin';
import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
type KeywordListProps = {
    font: string;
    keywords: string[];
};

export const KeywordList = ({ font, keywords }: KeywordListProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const onClick = () => {
        setIsOpen((prev) => !prev);
    };
    return (
        <div className="w-10/12" style={{ fontFamily: font }}>
            {keywords.length > 0 && (
                <div className="">
                    <p className="font-bold ">편지의 키워드</p>
                    <Margin bottom={10} />
                    <p
                        className={`flex flex-wrap ${isOpen ? '' : 'max-w-[550px] overflow-hidden'}`}
                    >
                        {keywords
                            .slice(0, isOpen ? keywords.length : 4)
                            .map((keyword, index) => (
                                <span key={index} className="keyword-tag">
                                    {keyword}
                                </span>
                            ))}
                        {!isOpen && keywords.length > 4 && (
                            <button
                                className="flex items-center"
                                onClick={onClick}
                            >
                                <span className="text-4xl">...</span>
                                <IoIosArrowDown className="text-3xl " />
                            </button>
                        )}
                        {isOpen && keywords.length > 4 && (
                            <button
                                className="flex items-center"
                                onClick={onClick}
                            >
                                <IoIosArrowUp className="text-3xl " />
                            </button>
                        )}
                    </p>
                </div>
            )}
        </div>
    );
};
