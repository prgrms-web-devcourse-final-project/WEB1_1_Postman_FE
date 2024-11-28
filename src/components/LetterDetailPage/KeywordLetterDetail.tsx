type KeywordLetterDetailProps = {
    content: string;
    keywords: string[];
    date: string;
};

export const KeywordLetterDetail = ({
    content,
    keywords,
    date
}: KeywordLetterDetailProps) => {
    return (
        <>
            <p className="absolute left-24 top-[19rem]">{content}</p>
            <div className="absolute bottom-16 rounded-lg w-[580px] h-[100px] bg-gray-300">
                <p className="font-bold m-4">편지의 키워드</p>
                <p className="overflow-hidden whitespace-nowrap text-ellipsis m-4">
                    {keywords.join(' / ')}
                </p>
            </div>
            <div className="absolute bottom-8 translate-x-60 flex-col">
                <p className="ml-2">{date}</p>
            </div>
        </>
    );
};
