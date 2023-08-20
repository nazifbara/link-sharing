/* eslint-disable @typescript-eslint/no-explicit-any */
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import { signUpSchema } from '$lib/utils/zod';
import { signUp } from '$lib/utils/client.js';

export const load = async () => {
	const form = await superValidate(signUpSchema);

	return { form, apiError: undefined };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, signUpSchema);

		if (!form.valid) {
			return fail(400, { form, apiError: undefined });
		}

		try {
			await signUp(form.data.email, form.data.password);
		} catch (error: any) {
			return fail(503, {
				form,
				apiError: {
					code: error.code,
					message: error.message
				}
			});
		}

		throw redirect(301, '/auth/login');
	}
};
