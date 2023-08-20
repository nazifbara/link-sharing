/* eslint-disable @typescript-eslint/no-explicit-any */
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import { loginSchema } from '$lib/utils/zod';
import { login } from '$lib/utils/client.js';

export const load = async () => {
	const form = await superValidate(loginSchema);

	return { form, apiError: undefined, user: undefined };
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, loginSchema);

		if (!form.valid) {
			return fail(400, { form, apiError: undefined, user: undefined });
		}

		try {
			const { user } = await login(form.data.email, form.data.password);
			const idToken = await user.getIdToken();
			cookies.set('auth', idToken, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7 // 1 week
			});
		} catch (error: any) {
			return fail(500, {
				form,
				apiError: {
					code: error.code,
					message: error.message
				}
			});
		}

		throw redirect(300, '/app');
	}
};
