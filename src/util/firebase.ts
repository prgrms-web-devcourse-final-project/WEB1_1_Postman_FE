import { initializeApp } from 'firebase/app';
import {
    getMessaging,
    getToken,
    onMessage,
    Messaging
} from 'firebase/messaging';

// Firebase config 타입 정의
const firebaseConfig = {
    apiKey: 'AIzaSyBodJm9QErZvWuaOdM6Af1H82LA-8ZcmhE',
    authDomain: 'fcm-test-51b74.firebaseapp.com',
    projectId: 'fcm-test-51b74',
    storageBucket: 'fcm-test-51b74.appspot.com',
    messagingSenderId: '10805910843',
    appId: '1:10805910843:web:e88131c7c1ef503822eb1e',
    measurementId: 'G-FXC5BWDC6G'
};

// Firebase 앱 초기화
const firebaseApp = initializeApp(firebaseConfig);

// Firebase Messaging 초기화
const firebaseMessaging: Messaging = getMessaging(firebaseApp);

export { firebaseMessaging, getToken, onMessage };
