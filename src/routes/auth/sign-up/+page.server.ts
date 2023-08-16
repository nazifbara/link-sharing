import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import { loginSchema } from '$lib/utils/zod';

export const load = async () => {
	const form = await superValidate(loginSchema);

	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, loginSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		return { form };
	}
};
