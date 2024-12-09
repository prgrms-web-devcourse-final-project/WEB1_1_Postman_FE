import { NavLink } from 'react-router-dom';

export const LabelLotteryBanner = () => {
    return (
        <NavLink to={'/lottery'} className="w-full">
            <img src="/배너샘플1.png" className="object-contain" />
        </NavLink>
    );
};
