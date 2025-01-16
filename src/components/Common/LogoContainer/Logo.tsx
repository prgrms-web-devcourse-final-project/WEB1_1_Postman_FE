type LogoProps = {
    h?: number;
};

export const Logo = ({ h = 24 }: LogoProps) => {
    return (
        <img
            className="object-contain"
            style={{ height: `${h}px` }}
            src="/logo.svg"
            alt="logo"
        />
    );
};
