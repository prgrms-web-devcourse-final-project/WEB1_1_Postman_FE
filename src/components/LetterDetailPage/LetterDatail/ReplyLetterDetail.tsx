import { formatDate } from '@/util/formatDate';

type ReplyLetterDetailProps = {
    letterData: {
        content: string;
        font: string;
        label: string;
        paper: string;
        createdAt: string;
    };
};

export const ReplyLetterDetail = ({ letterData }: ReplyLetterDetailProps) => {
    const { content, createdAt } = letterData;
    return (
        <>
            <div className="absolute bottom-4 translate-x-40"></div>
            <p className="absolute left-24 top-[19rem]">{content}</p>

            <div className="absolute bottom-4 sflex-col">
                <p>{formatDate(createdAt)}</p>
            </div>
        </>
    );
};
