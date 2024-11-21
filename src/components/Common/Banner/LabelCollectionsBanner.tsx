export const LabelCollectionsBanner = () => {
    return (
        <button className="flex items-center text-left w-full">
            <div className="flex flex-col">
                <p>라벨 모음</p>
                <p>
                    가지고 있는 라벨들을
                    <br />
                    확인해보세요
                </p>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="60"
                fill="none"
                viewBox="0 0 408 249"
                className="ml-16"
            >
                <path
                    fill="#C3C3C3"
                    d="M368.5 0.222656L407.21 127.258L39.6975 248.286L94.3479 164.488L0.987028 121.251L368.5 0.222656Z"
                />
            </svg>
        </button>
    );
};
