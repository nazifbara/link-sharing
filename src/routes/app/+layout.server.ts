import { getProfile } from '$lib/utils/client.js';

export const load = async ({ locals }) => {
	const profile = (await getProfile(locals.user?.uid as string))?.data;

	return { profile };
};
