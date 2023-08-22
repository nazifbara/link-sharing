import { PUBLIC_FIREBASE_PROJECT_ID } from '$env/static/public';
import { SECRET_FIREBASE_PRIVATE_KEY, SECRET_FIREBASE_CLIENT_EMAIL } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';

const firebaseAdminConfig = {
	projectId: PUBLIC_FIREBASE_PROJECT_ID,
	privateKey: SECRET_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
	clientEmail: SECRET_FIREBASE_CLIENT_EMAIL
};

let firebaseAdminApp;

if (!getApps()) {
	firebaseAdminApp = initializeApp({ credential: cert(firebaseAdminConfig) }, 'adminApp');
}

export const firebaseAdminAuth = getAdminAuth(firebaseAdminApp);

export const authenticateUser = async (
	event: RequestEvent
): Promise<{ email?: string; uid: string } | null> => {
	const { cookies } = event;

	const idToken = cookies.get('auth') ?? '';

	try {
		const user = await firebaseAdminAuth.verifyIdToken(idToken);
		return { uid: user.uid, email: user.email };
	} catch (error) {
		return null;
	}
};
