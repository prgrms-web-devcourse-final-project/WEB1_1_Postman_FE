import { ListItem } from '../Common/ListItem/ListItem';
import { Margin } from '../Common/Margin/Margin';

export const UnReadNotificationContainer = () => {
    return (
        <div className="">
            <div>새로운 소식</div>

            <Margin top={20} />

            <ListItem />
            <ListItem />
        </div>
    );
};
