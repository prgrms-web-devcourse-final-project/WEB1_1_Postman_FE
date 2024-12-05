type ReplyLetterDetailProps = {
    title: string;
    content: string;
    date: string;
};

export const ReplyLetterDetail = ({
    title,
    content,
    date
}: ReplyLetterDetailProps) => {
    return (
        <>
            <div className="absolute bottom-4 translate-x-40"></div>
            <p className="absolute left-24 top-60 font-bold">Re: {title}</p>
            <p className="absolute left-24 top-[19rem]">{content}</p>

            <div className="absolute bottom-4 translate-x-60 flex-col">
                <p className="ml-2">{date}</p>
            </div>
        </>
    );
};
