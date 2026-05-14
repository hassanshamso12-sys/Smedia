import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, initializeFirestore, memoryLocalCache } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "your-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-app.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-app",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-app.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "sender-id",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "app-id",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "measurement-id"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Initialize Analytics conditionally (only supported in some environments like browsers)
let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

// Use in-memory cache to avoid filling browser IndexedDB storage.
// The try/catch handles HMR re-runs where Firestore is already initialized.
let db;
try {
  db = initializeFirestore(app, { localCache: memoryLocalCache() });
} catch {
  db = getFirestore(app);
}

export { app, db, auth, analytics };
