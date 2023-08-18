import {
	PUBLIC_FIREBASE_API_KEY,
	PUBLIC_FIREBASE_AUTH_DOMAIN,
	PUBLIC_FIREBASE_PROJECT_ID,
	PUBLIC_FIREBASE_STORAGE_BUCKET,
	PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	PUBLIC_FIREBASE_APP_ID
} from '$env/static/public';
import { SECRET_FIREBASE_PRIVATE_KEY, SECRET_FIREBASE_CLIENT_EMAIL } from '$env/static/private';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
	apiKey: PUBLIC_FIREBASE_API_KEY,
	authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: PUBLIC_FIREBASE_APP_ID
};

export const firebaseAdminConfig = {
	projectId: PUBLIC_FIREBASE_PROJECT_ID,
	privateKey: SECRET_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
	clientEmail: SECRET_FIREBASE_CLIENT_EMAIL
};

let firebaseApp;

if (!getApps().length) {
	firebaseApp = initializeApp(firebaseConfig, '1');
}

const firebaseAuth = getAuth(firebaseApp);

export const login = async (email: string, password: string) => {
	return await signInWithEmailAndPassword(firebaseAuth, email, password);
};

export const signUp = async (email: string, password: string) =>
	await createUserWithEmailAndPassword(firebaseAuth, email, password);
