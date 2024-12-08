import { firebaseMessaging, getToken, onMessage } from '@/util/firebase';
import { useEffect } from 'react';
import { useToastStore } from './useToastStore';
import { postToken } from '@/service/nofication/postToken';

export const usePushNotification = () => {
    const { addToast } = useToastStore();

    useEffect(() => {
        const isNotificationSet = localStorage.getItem('isNofication');

        if (isNotificationSet === 'true') {
            return;
        }

        // 알림 권한 요청
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                getToken(firebaseMessaging, {
                    vapidKey: import.meta.env.VITE_FCM_VAPID_KEY
                })
                    .then((token) => {
                        localStorage.setItem('isNofication', 'true');
                        postToken({ token });
                    })
                    .catch((error) => {
                        addToast('알람 설정에 실패했습니다.', 'error');
                        console.error(error);
                    });
            } else {
                addToast('알람 설정을 거부했습니다.', 'success');
            }
        });

        // 알림 메시지를 받을 때마다 처리
        onMessage(firebaseMessaging, (payload) => {
            if (payload.notification) {
                addToast(`${payload.notification.body}`, 'success');
            }
        });
    }, []);
};
