import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from '@/App';

import { initializeApp } from 'firebase/app';
import {} from 'firebase/messaging';

// Firebase config 타입 정의
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Firebase 앱 초기화
initializeApp(firebaseConfig);

createRoot(document.getElementById('root')!).render(<App />);
