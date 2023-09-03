import { error } from '@sveltejs/kit';

import { getProfile, getPhotoURL } from '$lib/utils/client';

export const load = async ({ locals, params }) => {
	const profile = (await getProfile(params.userUID))?.data;

	if (!profile) {
		throw error(404, {
			message: 'Not found'
		});
	}

	return {
		profile,
		photoURL: profile.photoPath ? await getPhotoURL(profile.photoPath) : null,
		isOwner: params.userUID === locals.user?.uid
	};
};
