import { Margin } from '@/components/Common/Margin/Margin';
import { NotificationAppBar } from '@/components/NotificationPage/NotificationAppBar/NotificationAppBar';
import { ReadNotificationContainer } from '@/components/NotificationPage/ReadNotificationContainer';
import { UnReadNotificationContainer } from '@/components/NotificationPage/UnReadNotificationContainer';

export const NotificationPage = () => {
    // const notifications = [
    //     {
    //         id: 'ba017e82-022e-4a82-94db-f0c5d22ef318',
    //         type: 'NEW_LETTER',
    //         receiver: 99,
    //         createdAt: '2024-12-02T11:20:38.6242079',
    //         letterId: 1,
    //         isRead: false
    //     },
    //     {
    //         id: 'ba017e82-022e-4a82-94db-f0c5d22ef318',
    //         type: 'NEW_LETTER',
    //         receiver: 99,
    //         createdAt: '2024-12-02T11:20:38.6242079',
    //         letterId: 1,
    //         isRead: false
    //     },
    //     {
    //         id: '8f6f7748-dfd7-46b2-8e1f-4dff4abc8ab9',
    //         type: 'WARNING',
    //         receiver: 99,
    //         createdAt: '2024-12-02T11:17:16.7813547',
    //         letterId: null,
    //         isRead: true
    //     },
    //     {
    //         id: 'ba017e82-022e-4a82-94db-f0c5d22ef318',
    //         type: 'NEW_LETTER',
    //         receiver: 99,
    //         createdAt: '2024-12-02T11:20:38.6242079',
    //         letterId: 1,
    //         isRead: true
    //     },
    //     {
    //         id: 'ba017e82-022e-4a82-94db-f0c5d22ef318',
    //         type: 'NEW_LETTER',
    //         receiver: 99,
    //         createdAt: '2024-12-02T11:20:38.6242079',
    //         letterId: 1,
    //         isRead: true
    //     },
    //     {
    //         id: 'ba017e82-022e-4a82-94db-f0c5d22ef318',
    //         type: 'NEW_LETTER',
    //         receiver: 99,
    //         createdAt: '2024-12-02T11:20:38.6242079',
    //         letterId: 1,
    //         isRead: true
    //     }
    // ];

    return (
        <div className="">
            <NotificationAppBar />

            <Margin top={20} />

            <div className="px-[20px]">
                <ReadNotificationContainer />
            </div>

            <Margin top={20} />

            <div className="px-[20px]">
                <UnReadNotificationContainer />
            </div>
        </div>
    );
};
