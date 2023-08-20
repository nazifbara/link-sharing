/* eslint-disable @typescript-eslint/no-explicit-any */
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import { loginSchema } from '$lib/utils/zod';
import { login } from '$lib/utils/client.js';

export const load = async () => {
	const form = await superValidate(loginSchema);

	return { form, apiError: null };
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, loginSchema);

		if (!form.valid) {
			return fail(400, { form, apiError: null });
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
			console.log(error.code);

			if (['auth/user-not-found', 'auth/wrong-password'].includes(error.code)) {
				return fail(400, {
					form,
					apiError: 'Your email or password is incorrect. Please try again.'
				});
			}

			return fail(500, {
				form,
				apiError: 'Something went wrong. Please try again.'
			});
		}

		throw redirect(300, '/app');
	}
};
