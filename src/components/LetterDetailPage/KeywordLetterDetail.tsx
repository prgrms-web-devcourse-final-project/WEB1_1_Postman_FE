import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useKeywordLetterDetail } from '@/hooks/useGetKeywordLetterDetail';
import { formatDate } from '@/util/formatDate';
export const KeywordLetterDetail = () => {
    const { letterId } = useParams<{ letterId: string }>();
    const [isOpen, setIsOpen] = useState(false);

    const { data, isLoading, error } = useKeywordLetterDetail({
        letterId: letterId || ''
    });

    const onClick = () => {
        setIsOpen((prev) => !prev);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error instanceof Error) {
        console.error('error:', error.message);
        return <div>Error: {error.message}</div>;
    }

    if (data) {
        const { title, content, keywords, createdAt } = data;

        return (
            <>
                <p className="absolute left-24 top-[15rem]">{title}</p>
                <p className="absolute left-24 top-[19rem]">{content}</p>
                <div className="absolute bottom-16 w-[580px] h-[100px]">
                    {keywords.length > 0 && (
                        <>
                            <p className="font-bold m-4">편지의 키워드</p>
                            <div className="m-4">
                                <p
                                    className={`flex flex-wrap ${isOpen ? '' : 'max-w-[550px] overflow-hidden'}`}
                                >
                                    {keywords
                                        .slice(0, isOpen ? keywords.length : 4)
                                        .map((keyword, index) => (
                                            <span
                                                key={index}
                                                className="mr-2 mb-2 keyword-tag"
                                            >
                                                {keyword}
                                            </span>
                                        ))}
                                    {!isOpen && keywords.length > 4 && (
                                        <button
                                            className="flex items-center"
                                            onClick={onClick}
                                        >
                                            <span className="text-4xl">
                                                ...
                                            </span>
                                            <IoIosArrowDown className="text-3xl mr-2" />
                                        </button>
                                    )}
                                    {isOpen && keywords.length > 4 && (
                                        <button
                                            className="flex items-center"
                                            onClick={onClick}
                                        >
                                            <IoIosArrowUp className="text-3xl mr-2" />
                                        </button>
                                    )}
                                </p>
                            </div>
                        </>
                    )}
                </div>
                <div className="absolute bottom-8 translate-x-60 flex-col">
                    <p className="ml-2">{formatDate(createdAt)}</p>
                </div>
            </>
        );
    }
};
