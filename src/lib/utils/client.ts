import {
	PUBLIC_FIREBASE_API_KEY,
	PUBLIC_FIREBASE_AUTH_DOMAIN,
	PUBLIC_FIREBASE_PROJECT_ID,
	PUBLIC_FIREBASE_STORAGE_BUCKET,
	PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	PUBLIC_FIREBASE_APP_ID
} from '$env/static/public';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {
	getFirestore,
	collection,
	addDoc,
	query,
	where,
	getDocs,
	getDoc,
	updateDoc
} from 'firebase/firestore';
import type { DocumentReference, DocumentData } from 'firebase/firestore';

import type { Link, Profile } from './types';

const firebaseConfig = {
	apiKey: PUBLIC_FIREBASE_API_KEY,
	authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig, { name: 'clientApp' });
const auth = getAuth(app);
const db = getFirestore(app);

export async function getProfile(userUID: string) {
	let profile: DocumentReference<DocumentData, DocumentData> | undefined;
	const docSnapshot = await getDocs(
		query(collection(db, 'profiles'), where('userUID', '==', userUID))
	);
	if (docSnapshot.empty) {
		profile = await addDoc(collection(db, 'profiles'), {
			userUID,
			firstName: '',
			lastName: '',
			links: []
		});
	} else {
		docSnapshot.forEach((doc) => {
			profile = doc.ref;
		});
	}

	if (!profile) return;
	const profileDoc = await getDoc(profile);

	return { ref: profile, data: { id: profile.id, ...profileDoc.data() } as Profile };
}

export async function saveLinks(links: Link[], userUID: string) {
	const profile = await getProfile(userUID);
	if (!profile) return;
	await updateDoc(profile.ref, { ...profile.data, links });
}

export const login = async (email: string, password: string) => {
	return await signInWithEmailAndPassword(auth, email, password);
};

export const signUp = async (email: string, password: string) =>
	await createUserWithEmailAndPassword(auth, email, password);
