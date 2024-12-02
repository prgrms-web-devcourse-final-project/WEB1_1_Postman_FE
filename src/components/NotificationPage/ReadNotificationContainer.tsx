import { ListItem } from '../Common/ListItem/ListItem';
import { Margin } from '../Common/Margin/Margin';

export const ReadNotificationContainer = () => {
    return (
        <div className="">
            <div>이전 알림</div>

            <Margin top={20} />

            <ListItem />
            <ListItem />
        </div>
    );
};
