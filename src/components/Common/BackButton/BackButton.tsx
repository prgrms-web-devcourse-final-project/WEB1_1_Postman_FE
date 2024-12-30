type BackButtonProps = { onClick: () => void };

export const BackButton = ({ onClick }: BackButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="cursor-pointer"
            aria-label="뒤로 가기"
        >
            <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
                <path
                    d="M16.1004 21.7L8.61252 14.2122C8.49537 14.095 8.49537 13.9051 8.61252 13.7879L16.1004 6.30005"
                    stroke="currentColor"
                    strokeWidth="1.4"
                ></path>
            </svg>
        </button>
    );
};
