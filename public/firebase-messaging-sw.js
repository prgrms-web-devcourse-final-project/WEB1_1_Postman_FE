importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: 'AIzaSyBodJm9QErZvWuaOdM6Af1H82LA-8ZcmhE',
    authDomain: 'fcm-test-51b74.firebaseapp.com',
    projectId: 'fcm-test-51b74',
    storageBucket: 'fcm-test-51b74.appspot.com',
    messagingSenderId: '10805910843',
    appId: '1:10805910843:web:e88131c7c1ef503822eb1e',
    measurementId: 'G-FXC5BWDC6G'
});

const messaging = firebase.messaging();
