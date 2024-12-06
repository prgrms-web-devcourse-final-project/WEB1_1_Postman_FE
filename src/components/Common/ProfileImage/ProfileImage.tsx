import { ProfileImageItemType } from '@/types/profileImage';

type ProfileImageProps = {
    width?: string;
    height?: string;
    imageItem: ProfileImageItemType;
    onClick?: (imageItem: ProfileImageItemType) => void;
};

export const ProfileImage = ({
    width = '100px',
    height = '100px',
    imageItem,
    onClick
}: ProfileImageProps) => {
    return (
        <div
            className="border border-solid border-gray-100 rounded-full"
            style={{ width, height }}
            onClick={() => onClick?.(imageItem)}
        >
            <img
                src={imageItem.url}
                alt={imageItem.alt}
                className="rounded-full"
                style={{ width, height }}
            />
        </div>
    );
};
