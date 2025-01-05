import { useEffect } from 'react';
import { getToken, firebaseMessaging, onMessage } from '@/util/firebase';
import { postToken } from '@/service/nofication/postToken';
import { useToastStore } from '@/hooks';

export function usePushNotifications() {
    const { addToast } = useToastStore();

    useEffect(() => {
        const isToken = localStorage.getItem('isToken');

        if (isToken === 'true') {
            return;
        }

        const handlePushNotifications = async () => {
            try {
                const permission = await Notification.requestPermission();

                if (permission === 'granted') {
                    const token = await getToken(firebaseMessaging, {
                        vapidKey: import.meta.env.VITE_FCM_VAPID_KEY
                    });

                    try {
                        const data = await postToken({ token });
                        addToast(`${data.message}`, 'success');
                        localStorage.setItem('isToken', 'true');
                    } catch (error) {
                        console.error('Error posting token: ', error);
                    }
                } else {
                    console.log('Notification permission denied');
                }
            } catch (error) {
                console.error('FCM Error: ', error);
            }
        };

        // 푸시 알림 설정 및 메시지 수신 처리
        handlePushNotifications();

        const unsubscribe = onMessage(firebaseMessaging, (payload) => {
            if (payload.notification) {
                alert(payload.notification.body);
            }
        });

        // 컴포넌트 언마운트 시 리스너 해제
        return () => {
            unsubscribe();
        };
    }, [addToast]);
}
