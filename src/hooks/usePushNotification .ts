import { firebaseMessaging, getToken, onMessage } from '@/util/firebase';
import { useEffect, useState } from 'react';
import { useToastStore } from './useToastStore';
import { postToken } from '@/service/nofication/postToken';

export const usePushNotification = () => {
    const { addToast } = useToastStore();
    const [isTokenRequested, setIsTokenRequested] = useState(false); // 토큰 요청 여부 체크

    useEffect(() => {
        if (Notification.permission === 'granted' && !isTokenRequested) {
            // 알림 권한이 이미 허용된 경우, 그리고 토큰을 요청한 적 없는 경우
            getToken(firebaseMessaging, {
                vapidKey: import.meta.env.VITE_FCM_VAPID_KEY
            })
                .then((token) => {
                    addToast('알람 설정을 성공했습니다.', 'success');
                    postToken({ token });
                    setIsTokenRequested(true); // 토큰을 요청한 상태로 설정
                })
                .catch((error) => {
                    console.error(error);
                });
        } else if (Notification.permission === 'denied') {
            // 알림 권한이 거부된 경우
            addToast('알람 설정을 거부했습니다.', 'warning');
        } else if (Notification.permission === 'default') {
            // 권한을 아직 요청하지 않은 경우
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    getToken(firebaseMessaging, {
                        vapidKey: import.meta.env.VITE_FCM_VAPID_KEY
                    })
                        .then((token) => {
                            addToast('알람 설정을 성공했습니다.', 'success');
                            postToken({ token });
                            setIsTokenRequested(true); // 토큰을 요청한 상태로 설정
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
    }, [isTokenRequested]); // `isTokenRequested`가 바뀔 때만 실행되게 설정
};
