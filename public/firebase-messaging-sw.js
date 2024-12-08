importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: 'AIzaSyBodJm9QErZvWuaOdM6Af1H82LA-8ZcmhE',
    authDomain: 'fcm-test-51b74.firebaseapp.com',
    projectId: 'fcm-test-51b74',
    storageBucket: 'fcm-test-51b74.firebasestorage.app',
    messagingSenderId: '10805910843',
    appId: '1:10805910843:web:e88131c7c1ef503822eb1e',
    measurementId: 'G-FXC5BWDC6G'
});

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 백그라운드에서 푸시 메시지 수신
onBackgroundMessage(messaging, (payload) => {
    console.log('백그라운드 푸시 메시지 받음: ', payload);
    // 알림을 트리거하는 코드
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
