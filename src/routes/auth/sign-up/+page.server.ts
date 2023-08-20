/* eslint-disable @typescript-eslint/no-explicit-any */
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import { signUpSchema } from '$lib/utils/zod';
import { signUp } from '$lib/utils/client.js';

export const load = async () => {
	const form = await superValidate(signUpSchema);

	return { form, apiError: null };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, signUpSchema);

		if (!form.valid) {
			return fail(400, { form, apiError: null });
		}

		try {
			await signUp(form.data.email, form.data.password);
		} catch (error: any) {
			if (error.code === 'auth/email-already-in-use') {
				return fail(400, {
					form,
					apiError: 'This email is already in use'
				});
			}

			return fail(500, {
				form,
				apiError: 'There was an error registering. Please try again.'
			});
		}

		throw redirect(301, '/auth/login');
	}
};
