type DayCounterProps = {
    width?: string;
    height?: string;
    createdAt: string;
};

export const DayCounter = ({
    width = '66px',
    height = '30px',
    createdAt
}: DayCounterProps) => {
    const currentDate = new Date();

    const createdDate = new Date(createdAt);

    const diffInMilliseconds = currentDate.getTime() - createdDate.getTime();
    const daysPassed = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    return (
        <div
            className="p-1 bg-gray-100 flex-center rounded-xl"
            style={{ width, height }}
        >
            <span className="text-xs font-bold text-gray-500 text-nowrap">
                D+{daysPassed}일
            </span>
        </div>
    );
};
