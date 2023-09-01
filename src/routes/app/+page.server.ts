/* eslint-disable @typescript-eslint/no-explicit-any */
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

import { linksSchema } from '$lib/utils/zod';
import { updateProfile } from '$lib/utils/client.js';
import type { Link } from '$lib/utils/types.js';

export const load = async ({ parent }) => {
	const { profile } = await parent();
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
			await updateProfile(locals.user?.uid as string, { links: form.data.links });
			return { form, apiError: null };
		} catch (error: any) {
			console.log(error);
			return fail(500, { form, apiError: 'Something went wrong. Please try again.' });
		}
	}
};
