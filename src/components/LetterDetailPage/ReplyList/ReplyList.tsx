import { ReplyListResponseType } from '@/types/letter';
import { formatDate } from '@/util/formatDate';
import { NavLink, useLocation } from 'react-router-dom';

type ReplyListProps = {
    title: string;
    keywordReplyListData: ReplyListResponseType['content'];
};

export const ReplyList = ({ title, keywordReplyListData }: ReplyListProps) => {
    const location = useLocation();
    const basePath = location.pathname.split('/')[2];

    return (
        <div className="bg-gray-300 rounded-2xl w-auto">
            {keywordReplyListData.map((reply, index) => (
                <NavLink
                    key={reply.replyLetterId}
                    to={`/letter/${basePath}/reply/${reply.replyLetterId}`}
                    className={`flex items-center cursor-pointer h-1 p-6 ${
                        index < keywordReplyListData.length - 1
                            ? 'border-b border-l-neutral-300'
                            : ''
                    }`}
                >
                    <div className="flex items-center justify-between w-full hover:opacity-70">
                        <span className="font-bold w-44 truncate mr-4">
                            RE: {title}
                        </span>
                        <span className="text-sm truncate flex-1 text-gray-600">
                            {formatDate(reply.createdAt)}
                        </span>
                        <div className="text-2xl">{'>'}</div>
                    </div>
                </NavLink>
            ))}
        </div>
    );
};
