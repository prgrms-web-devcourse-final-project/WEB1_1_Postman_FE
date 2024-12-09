import { firebaseMessaging, getToken, onMessage } from '@/util/firebase';
import { useEffect } from 'react';
import { useToastStore } from './useToastStore';
import { postToken } from '@/service/nofication/postToken';

export const usePushNotification = () => {
    const { addToast } = useToastStore();

    useEffect(() => {
        if (Notification.permission === 'granted') {
            // 알림 권한이 이미 허용된 경우
            getToken(firebaseMessaging, {
                vapidKey: import.meta.env.VITE_FCM_VAPID_KEY
            })
                .then((token) => {
                    addToast('알람 설정을 성공했습니다.', 'success');
                    postToken({ token });
                })
                .catch((error) => {
                    console.error(error);
                });
        } else if (Notification.permission === 'denied') {
            // 알림 권한이 거부된 경우
            addToast('알람 설정을 거부했습니다.', 'warning');
        } else {
            // 권한을 아직 요청하지 않은 경우
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    getToken(firebaseMessaging, {
                        vapidKey: import.meta.env.VITE_FCM_VAPID_KEY
                    })
                        .then((token) => {
                            addToast('알람 설정을 성공했습니다.', 'success');
                            postToken({ token });
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                } else {
                    addToast('알람 설정을 거부했습니다.', 'warning');
                }
            });
        }

        // 메시지 수신 처리
        onMessage(firebaseMessaging, (payload) => {
            if (payload.notification) {
                addToast(`${payload.notification.body}`, 'success');
            }
        });
    }, []);
};
