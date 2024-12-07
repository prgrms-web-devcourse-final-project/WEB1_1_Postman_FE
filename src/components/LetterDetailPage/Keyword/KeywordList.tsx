import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
type KeywordListProps = {
    keywords: string[];
};

export const KeywordList = ({ keywords }: KeywordListProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const onClick = () => {
        setIsOpen((prev) => !prev);
    };
    return (
        <>
            {keywords.length > 0 && (
                <p
                    className={`flex flex-wrap ${isOpen ? '' : 'max-w-[550px] overflow-hidden'}`}
                >
                    {keywords
                        .slice(0, isOpen ? keywords.length : 4)
                        .map((keyword, index) => (
                            <span key={index} className="keyword-tag key">
                                {keyword}
                            </span>
                        ))}
                    {!isOpen && keywords.length > 4 && (
                        <button className="flex items-center" onClick={onClick}>
                            <span className="text-4xl">...</span>
                            <IoIosArrowDown className="text-3xl " />
                        </button>
                    )}
                    {isOpen && keywords.length > 4 && (
                        <button className="flex items-center" onClick={onClick}>
                            <IoIosArrowUp className="text-3xl " />
                        </button>
                    )}
                </p>
            )}
        </>
    );
};
