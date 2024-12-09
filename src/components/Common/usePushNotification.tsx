import { getToken, onMessage } from 'firebase/messaging';
import { firebaseMessaging } from '@/util/firebase';
import { postToken } from '@/service/nofication/postToken';

// 푸시 알림 권한 요청 및 토큰 가져오기
const handlePushNotificationPermission = () => {
    if (Notification.permission === 'granted') {
        // 권한이 허용된 경우
        getToken(firebaseMessaging, {
            vapidKey: import.meta.env.VITE_FCM_VAPID_KEY
        })
            .then((token) => {
                console.log('알람 설정을 성공했습니다.');
                postToken({ token }); // 서버에 토큰 전송
            })
            .catch((error) => {
                console.error('FCM Error:', error);
            });
    } else if (Notification.permission === 'denied') {
        console.log('알람 설정을 거부했습니다.');
    } else {
        // 권한을 아직 요청하지 않은 경우
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                getToken(firebaseMessaging, {
                    vapidKey: import.meta.env.VITE_FCM_VAPID_KEY
                })
                    .then((token) => {
                        console.log('알람 설정을 성공했습니다.');
                        postToken({ token }); // 서버에 토큰 전송
                    })
                    .catch((error) => {
                        console.error('FCM Error:', error);
                    });
            } else {
                console.log('알람 설정을 거부했습니다.');
            }
        });
    }
};

// 푸시 알림 메시지 수신 처리
const setupPushNotificationListener = () => {
    return onMessage(firebaseMessaging, (payload) => {
        if (payload.notification) {
            console.log(`푸시 알림: ${payload.notification.body}`);
        }
    });
};

// 푸시 알림 설정 및 메시지 리스너 설정을 하나로 묶은 함수
export const setupPushNotifications = () => {
    handlePushNotificationPermission(); // 푸시 알림 권한 설정
    return setupPushNotificationListener(); // 푸시 알림 메시지 리스너 설정
};
