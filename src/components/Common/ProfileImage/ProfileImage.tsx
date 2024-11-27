type ProfileImageProps = {
    width?: string;
    height?: string;
};

export const ProfileImage = ({
    width = '100px',
    height = '100px'
}: ProfileImageProps) => {
    const imageItem = {
        id: '프로필_샘플',
        name: '이미지',
        src: '/프로필_샘플.png'
    };

    return (
        <div
            className="border border-solid border-gray-100 rounded-full"
            style={{ width, height }}
        >
            <img
                src={imageItem.src}
                alt={imageItem.name}
                className="rounded-full"
                style={{ width, height }}
            />
        </div>
    );
};
