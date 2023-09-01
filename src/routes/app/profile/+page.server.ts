/* eslint-disable @typescript-eslint/no-explicit-any */
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import { profileDetailsSchema } from '$lib/utils/zod';
import { updateProfile } from '$lib/utils/client.js';

export const load = async ({ parent }) => {
	const { profile } = await parent();

	const form = await superValidate({ ...profile }, profileDetailsSchema, { errors: false });

	return { form, apiError: null };
};

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, profileDetailsSchema);
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await updateProfile(locals.user?.uid as string, form.data);
		} catch (error: any) {
			return fail(400, {
				form,
				apiError: 'Something went wrong...'
			});
		}

		return { form, apiError: null };
	}
};
