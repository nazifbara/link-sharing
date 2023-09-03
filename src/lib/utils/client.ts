import {
	PUBLIC_FIREBASE_API_KEY,
	PUBLIC_FIREBASE_AUTH_DOMAIN,
	PUBLIC_FIREBASE_PROJECT_ID,
	PUBLIC_FIREBASE_STORAGE_BUCKET,
	PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	PUBLIC_FIREBASE_APP_ID
} from '$env/static/public';
import { v4 as uuid } from 'uuid';
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
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

import type { Profile } from './types';

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
const storage = getStorage(app);

export async function updateProfile(userUID: string, data: Partial<Profile>) {
	const profile = await getProfile(userUID);
	if (!profile) return;
	await updateDoc(profile.ref, { ...profile.data, ...data });
}

export async function deletePhoto(profile: Profile) {
	if (profile.photoPath) {
		await deleteObject(ref(storage, profile.photoPath));
	}
}

export async function getPhotoURL(path: string) {
	try {
		return await getDownloadURL(ref(storage, path));
	} catch (error) {
		return null;
	}
}
export async function uploadPhoto(file: File) {
	const storageRef = ref(storage, `profile-photos/${uuid()}`);
	return await uploadBytes(storageRef, file);
}

async function createProfile(userUID: string) {
	const profile = await addDoc(collection(db, 'profiles'), {
		userUID,
		firstName: '',
		lastName: '',
		email: '',
		photoPath: '',
		links: []
	});

	const profileDoc = await getDoc(profile);

	return { ref: profile, data: { id: profile.id, ...profileDoc.data() } as Profile };
}

export async function getProfile(userUID: string) {
	const docSnapshot = await getDocs(
		query(collection(db, 'profiles'), where('userUID', '==', userUID))
	);

	if (docSnapshot.empty) {
		return null;
	}

	const profile = await getDoc(docSnapshot.docs[0].ref);
	return { ref: profile.ref, data: { id: profile.id, ...profile.data() } as Profile };
}

export async function getCreateProfile(userUID: string) {
	const profile = await getProfile(userUID);

	if (!profile) {
		return await createProfile(userUID);
	}

	return profile;
}

export const login = async (email: string, password: string) => {
	return await signInWithEmailAndPassword(auth, email, password);
};

export const signUp = async (email: string, password: string) =>
	await createUserWithEmailAndPassword(auth, email, password);
