import React from 'react';

type ListItemProps = {
    image?: string;
    contents?: string;
    link?: string;
};

export const ListItem = ({
    image = 'https://i.postimg.cc/MHYqzbTg/3.png',
    contents = '새로운 편지입니다.',
    link = '#'
}: ListItemProps) => {
    const content = (
        <div className="flex w-[100%] items-center justify-between">
            <span className="flex gap-6 items-center">
                {image && (
                    <img
                        src={image}
                        alt="icon"
                        className="w-[60px] h-[60px] rounded-full object-cover"
                    />
                )}
                {contents}
            </span>
            <svg className="w-5 h-5" viewBox="0 0 28 28" fill="none">
                <path
                    d="M16.1004 21.7L8.61252 14.2122C8.49537 14.095 8.49537 13.9051 8.61252 13.7879L16.1004 6.30005"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    transform="rotate(180 14 14)" // 180도 회전
                ></path>
            </svg>
        </div>
    );

    return (
        /**
         * react-router-dom의 Link를 사용할 때
         */
        // <Link
        //     to={link} // link로 연결
        //     className="h-[60px] w-[100%] bg-gray-400 rounded-xl flex justify-center"
        // >
        //     {content}
        // </Link>
        <div
            className="w-[100%] bg-gray-100 rounded-xl flex justify-center p-6"
            onClick={() => console.log(link)}
        >
            {content}
        </div>
    );
};
