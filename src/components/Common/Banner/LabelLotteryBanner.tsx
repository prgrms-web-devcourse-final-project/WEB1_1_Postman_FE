import { NavLink } from 'react-router-dom';

export const LabelLotteryBanner = () => {
    return (
        <NavLink to={'/lottery'} className="flex items-center text-left w-full">
            <div className="flex flex-col">
                <p>라벨 뽑기</p>
                <p>라벨 뽑으러가기</p>
            </div>
        </NavLink>
    );
};
