import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import { profileDetailsSchema } from '$lib/utils/zod';

export const load = async () => {
	const form = await superValidate(profileDetailsSchema);

	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, profileDetailsSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		return { form };
	}
};
