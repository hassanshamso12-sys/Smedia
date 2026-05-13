import * as admin from 'firebase-admin';

// Initialize the Firebase Admin SDK
// This should only be run on the server side (e.g., in API routes or Server Components)
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com' // Add if using RTDB
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

const adminDb = admin.firestore();

export { adminDb };
