import { getProfile, getPhotoURL } from '$lib/utils/client';

export const load = async ({ locals, depends }) => {
	depends('data:profile');
	const profile = (await getProfile(locals.user?.uid as string))?.data;

	return {
		profile,
		photoURL: profile?.photoPath ? await getPhotoURL(profile.photoPath) : null
	};
};
