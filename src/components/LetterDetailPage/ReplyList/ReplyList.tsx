import { NavLink } from 'react-router-dom';
type ReplyListProps = {
    replies: {
        id: number;
        title: string;
        date: string;
    }[];
};

export const ReplyList = ({ replies }: ReplyListProps) => {
    return (
        <NavLink
            to="/letter/reply/:id"
            className="bg-gray-300 rounded-2xl w-auto"
        >
            {replies.map((reply, index) => (
                <div
                    key={reply.id}
                    className={`flex items-center cursor-pointer h-1 p-6 ${
                        index < replies.length - 1
                            ? 'border-b border-l-neutral-300'
                            : ''
                    }`}
                >
                    <div
                        className={`flex items-center justify-between w-full hover:opacity-70 `}
                    >
                        <span className="font-bold w-44 truncate mr-4">
                            Re: {reply.title}
                        </span>
                        <span className="text-sm truncate flex-1 text-gray-600">
                            {reply.date}
                        </span>
                        <div className="text-2xl">{'>'}</div>
                    </div>
                </div>
            ))}
        </NavLink>
    );
};
