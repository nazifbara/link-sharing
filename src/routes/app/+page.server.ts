/* eslint-disable @typescript-eslint/no-explicit-any */
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

import { linksSchema } from '$lib/utils/zod';
import { saveLinks, getProfile } from '$lib/utils/client.js';
import type { Link } from '$lib/utils/types.js';

export const load = async ({ locals }) => {
	const profile = (await getProfile(locals.user?.uid as string))?.data;
	const form = await superValidate({ links: [...(profile?.links as Link[])] }, linksSchema);

	return { form, apiError: null, profile };
};

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, linksSchema);

		if (!form.valid) {
			return fail(400, { form, apiError: null });
		}
		try {
			await saveLinks(form.data.links, locals.user?.uid as string);
			return { form, apiError: null };
		} catch (error: any) {
			console.log(error);
			return fail(500, { form, apiError: 'Something went wrong. Please try again.' });
		}
	}
};
